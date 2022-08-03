import { Heading, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import ProjectsList from '../../components/projects/ProjectsList'
import { Project } from '../../interfaces/project.interface'
import ProjectsService from '../../services/ProjectsService'
import { translate } from '../../utils/language.utils'

interface Props {
    projects?: Project[]
}

const Projects: NextPage = ({ projects }: Props) => {
    return (
        <Stack spacing={10}>
            <Heading>
                {translate('PROJECTS')}
            </Heading>
            <ProjectsList projects={projects} />
        </Stack>
    )
}

export async function getStaticProps() {
    const projects = await ProjectsService.fetchProjects()

    return { props: { projects } }
}

export default Projects