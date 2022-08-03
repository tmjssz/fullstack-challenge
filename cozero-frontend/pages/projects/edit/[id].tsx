import { Avatar, chakra, Flex, Heading, List, ListIcon, ListItem, Stack, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import ProjectsService from "../../../services/ProjectsService";
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import TimeAgo from 'react-timeago'
import { TbLeaf } from "react-icons/tb";
import ProjectForm from "../../../components/projects/ProjectForm";

export default function Project({ project }: InferGetStaticPropsType<typeof getStaticProps>) {
    const TimeAgeComponent = chakra(TimeAgo)
    const LeafIcon = chakra(TbLeaf)
    const [min, max] = project.co2EstimateReduction

    return (
        <Stack spacing={10}>
            <Heading>
                Editing {project?.name}
            </Heading>
            <ProjectForm projectToUpdate={project} />
        </Stack>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const project = await ProjectsService.fetchProjectById(context?.params?.id as string);
    return {
        props: {
            project
        },
    };
}

export async function getStaticPaths() {
    const projects = await ProjectsService.fetchProjects();
    const paths = projects?.map((item) => {
        return {
            params: {
                id: item.id.toString(),
            },
        };
    })

    return {
        paths,
        fallback: false,
    };
}