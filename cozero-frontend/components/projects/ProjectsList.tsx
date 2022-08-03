import { Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Project } from "../../interfaces/project.interface";
import ProjectsService from "../../services/ProjectsService";
import { translate } from "../../utils/language.utils";
import ProjectItem from "./ProjectItem";

interface Props {
    projects?: Project[]
}

export default function ProjectsList({ projects }: Props) {
    const [projectList, setProjectList] = useState<Project[]>([])
    const navigator = useRouter()
    const toast = useToast();

    useEffect(() => {
        const sortedProjects = ProjectsService.sortProjects(projects);

        setProjectList(sortedProjects || [])
    }, [projects])


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

    return (
        <Stack spacing={8}>
            {projectList?.map(project => (
                <ProjectItem key={project.id} project={project} onDelete={onDelete} />
            ))
            }
            <Flex gap={2} justifyContent='center'>
                <Text>{translate('PROJECTS_FOOTER_CTA')}</Text>
                <Text
                    onClick={() => navigator.push(`/projects/create`)}
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