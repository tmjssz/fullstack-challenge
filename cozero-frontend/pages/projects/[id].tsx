import { Avatar, chakra, Flex, Heading, List, ListIcon, ListItem, Stack, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import ProjectsService from "../../services/ProjectsService";
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import TimeAgo from 'react-timeago'
import { TbLeaf } from "react-icons/tb";
import { translate } from "../../utils/language.utils";

export default function Project({ project }: InferGetStaticPropsType<typeof getStaticProps>) {
    const TimeAgeComponent = chakra(TimeAgo)
    const LeafIcon = chakra(TbLeaf)
    const [min, max] = project.co2EstimateReduction

    return (
        <Stack spacing={10}>
            <Heading>
                {project?.name}
            </Heading>
            <Text color='gray.800'>
                {project?.description}
            </Text>
            <List spacing={3}>
                {project.listing.map((item: string, index: number) => (
                    <ListItem key={index}>
                        <Flex gap={4} alignItems='center'>
                            <ListIcon as={TbLeaf} color='green.500' />
                            <Text>{item}</Text>
                        </Flex>
                    </ListItem>
                ))}
            </List>
            <Flex justifyContent='flex-start' gap={4} alignItems='center'>
                <Avatar name={project.owner} size='md' />
                <Stack>
                    <Text color='gray.500' fontWeight='light'>Created by {project.owner}</Text>
                    <TimeAgeComponent color='gray.500' fontWeight='light' date={project.createdAt} />

                </Stack>
            </Flex>
            <Flex gap={4}>
                <LeafIcon size={50} color='green.500' />
                <Stat>
                    <StatLabel>{translate('EMISSIONS_LEARN')}</StatLabel>
                    <StatNumber>{min} - {max}</StatNumber>
                    <Text
                        onClick={() => {
                            window.open("https://wiki.cozero.io/en/log/emission-calculation/emissions-calculation", "_blank");
                        }}
                        cursor='pointer'
                        color='blue.300'
                        fontSize='sm'
                    >
                        {translate('EMISSIONS_LEARN')}
                    </Text>
                </Stat>
            </Flex>
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