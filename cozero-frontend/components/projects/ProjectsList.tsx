import { Button, Flex, Stack, Text, useToast, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProjectsEmptyState } from "./ProjectsEmptyState"
import { Project } from "../../interfaces/project.interface";
import ProjectsService from "../../services/ProjectsService";
import { translate } from "../../utils/language.utils";
import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const useQueryParam = (param: string) => {
    const [searchParams] = useSearchParams();
    const value = searchParams.get(param)
    return [value]
}

export default function ProjectsList() {
    const [projectList, setProjectList] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const [query] = useQueryParam('q');
    const toast = useToast();
    
    const fetchProjects = useCallback(async (query: string | null) => {
        const projects = await ProjectsService.fetchProjects(query)
        if (projects) {
            setProjectList(projects)
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        fetchProjects(query)
    }, [query])


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
        return <ProjectsEmptyState query={query}/>
    }

    return (
        <VStack spacing={8} alignItems="end">
            <Button size='sm' variant='outline' onClick={() => navigate(`/projects/deleted`)}>
                {translate("SHOW_DELETED_PROJECTS")}
            </Button>
            <Stack spacing={8} width="100%">
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
        </VStack>
    )
}