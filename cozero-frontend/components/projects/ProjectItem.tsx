import { Avatar, Box, Button, chakra, Flex, Stack, Text } from "@chakra-ui/react"
import { Project } from "../../interfaces/project.interface"
import { FaLeaf, FaTrashRestore } from "react-icons/fa"
import { MdModeEditOutline } from "react-icons/md"
import { BsFillTrashFill } from "react-icons/bs"
import TimeAgo from 'react-timeago'
import DeleteProjectConfirmation from "../DeleteProjectConfirmation"
import { useContext, useState } from "react"
import { translate } from "../../utils/language.utils"
import { useNavigate } from "react-router"
import { AuthContext } from "../../context/auth"

interface Props {
    project: Project
    onDelete?: (projectId: string) => void
}

const LeafIcon = chakra(FaLeaf)
const TimeAgeComponent = chakra(TimeAgo)

export default function ProjectItem({ project, onDelete = () => {} }: Props) {
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)
    const navigate = useNavigate()
    const { context } = useContext(AuthContext)
    const userEmail = context?.user?.email
    const isDeleted = project.deletedAt

    const onDeleteAction = () => {
        setIsDeleteConfirmationOpen(false)
        onDelete(project.id)
    }    

    return (
        <Box
            border='1px'
            borderColor='gray.500'
            p={6}
            rounded='lg'
            _hover={{
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease-in-out'
            }}
        >
            <Stack spacing={5}>
                <Flex justifyContent='space-between'>
                    <Text fontWeight='bold'>{project.name}</Text>
                    {userEmail === project.owner && (
                        isDeleted ? (
                            <Flex gap={3}>
                                <FaTrashRestore cursor='pointer' onClick={() => navigate(`/projects/${project.id}/edit`)} />
                            </Flex>
                        ) : (
                            <Flex gap={3}>
                                <MdModeEditOutline cursor='pointer' onClick={() => navigate(`/projects/${project.id}/edit`)} />
                                <BsFillTrashFill cursor='pointer' onClick={() => setIsDeleteConfirmationOpen(true)} />
                            </Flex>
                        )
                    )}
                </Flex>
                <Text textAlign='justify' noOfLines={5}>{project.description}</Text>
                <Flex alignItems='center' gap={2}>
                    <LeafIcon color={'green.500'} />
                    <Text fontWeight='bold' color='green.500'>{project.co2EstimateReduction[0]} - {project.co2EstimateReduction[1]} tons co2e.</Text>
                </Flex>
                <Flex justifyContent='space-between' gap={4} alignItems='center'>
                    {!isDeleted && <Flex>
                        <Button size='sm' onClick={() => navigate(`/projects/${project.id}`)}>
                            {translate('VIEW_FULL_PROJECT')}
                        </Button>
                    </Flex>}
                    <Flex gap={3}>
                        <Flex gap={1} flexDirection='column' justifyContent='flex-end'>
                            <Text color='gray.500' fontWeight='light' fontSize='sm'>{project.owner}</Text>
                            <Flex gap={1}>
                                {isDeleted && <Text color='gray.500' fontWeight='light' fontSize='sm'>Deleted</Text>}
                                <TimeAgeComponent date={isDeleted ? project.deletedAt : project.createdAt} textAlign='right' fontSize='sm' color='gray.500' fontWeight='light' />
                            </Flex>
                        </Flex>
                        <Avatar name={project.owner} size='sm' />
                    </Flex>
                </Flex>
            </Stack>
            <DeleteProjectConfirmation
                isOpen={isDeleteConfirmationOpen}
                onClose={() => setIsDeleteConfirmationOpen(false)}
                onDelete={onDeleteAction}
            />
        </Box>
    )
}