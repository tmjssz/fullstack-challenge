import {  Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { ProjectsEmptyState } from "./ProjectsEmptyState"
import { Project } from "../../interfaces/project.interface";
import ProjectsService from "../../services/ProjectsService";
import { translate } from "../../utils/language.utils";
import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router";

export default function ProjectsList() {
    const [projectList, setProjectList] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const toast = useToast();



    const fetchProjects = useCallback(async () => {
        const projects = await ProjectsService.fetchProjects()
        if (projects && projects?.length !== 0) {
            setProjectList(projects)
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])


    const onDelete = async (projectId: string) => {
        const deletedProject = await ProjectsService.deleteProject(projectId)

        toast({
            title: translate(deletedProject ? 'PROJECT_DELETED' : 'PROJECTED_DELETE_ERROR'),
            description: translate(deletedProject ? "PROJECT_DELETED_DESCRIPTION" : "PROJECT_DELETE_ERROR_DESCRIPTION"),
            status: deletedProject ? 'success' : 'error',
            duration: 9000,
            isClosable: true,
        })

        if (deletedProject) {
            setProjectList(projectList.filter(project => project.id !== projectId))
        }
    }

    if (projectList.length === 0 && !isLoading) {
        return <ProjectsEmptyState />
    }

    return (
        <Stack spacing={8}>
            {projectList?.map(project => (
                <ProjectItem key={project.id} project={project} onDelete={onDelete} />
            ))
            }
            <Flex gap={2} justifyContent='center'>
                <Text>{translate('PROJECTS_FOOTER_CTA')}</Text>
                <Text
                    onClick={() => navigate(`/projects/create`)}
                    cursor='pointer'
                    fontWeight='bold'
                    color='green.500'
                    textAlign='center'
                >
                    {translate('PROJECTS_FOOTER_CTA_BUTTON')}
                </Text>
            </Flex>
        </Stack>
    )
}