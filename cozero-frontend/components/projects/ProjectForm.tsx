import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input, List, ListIcon, ListItem, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import { FaLeaf } from "react-icons/fa"
import { BsFillTrashFill } from "react-icons/bs"
import { TbLeaf } from "react-icons/tb"
import { useForm, useFieldArray } from "react-hook-form";
import { CreateProjectDto, ProjectForm as IProjectForm, Project, UpdateProjectDto } from "../../interfaces/project.interface";
import { useEffect, useState } from "react";
import { createProjectDefaultValues } from "../../constants/project.constants";
import { useSession } from "next-auth/react";
import ProjectsService from "../../services/ProjectsService";
import { useRouter } from "next/router";
import { translate } from "../../utils/language.utils";
import { ProjectInformation } from "../../enums/projectInformation.enum";
import { getProjectResponseTranslation, projectFormToProjectDTO } from "../../utils/project.utils";

interface Props {
    projectToUpdate?: Project
}

export default function ProjectForm({ projectToUpdate }: Props) {
    const [listItem, setListItem] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const { data: session } = useSession()
    const toast = useToast()
    const navigator = useRouter()
    const { register, handleSubmit, watch, control, setValue, reset } = useForm<IProjectForm>({
        defaultValues: createProjectDefaultValues
    });
    const { append, remove } = useFieldArray({
        control,
        name: "listing",
    });

    useEffect(() => {
        if (projectToUpdate) {
            reset({
                ...projectToUpdate,
                listing: projectToUpdate.listing.map(item => {
                    return {
                        id: Date.now().toString() + Math.random().toString(),
                        name: item
                    }
                }),
                co2EstimateReduction: {
                    min: projectToUpdate.co2EstimateReduction[0],
                    max: projectToUpdate.co2EstimateReduction[1]
                }
            })
        }
    }, [projectToUpdate, reset])

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !!listItem) {
            append({
                name: listItem,
                id: Date.now().toString() + Math.random() // Not the best way to do this, but it works for this example
            })
            setListItem("");
            e.preventDefault();
        }
    }

    const onSubmitForm = async (projectForm: IProjectForm) => {
        setIsProcessing(true);

        const project: CreateProjectDto | UpdateProjectDto = projectFormToProjectDTO(projectForm, session?.user?.email as string)

        const projectResponse = projectToUpdate ? await ProjectsService.updateProject(project as UpdateProjectDto) : await ProjectsService.createProject(project as CreateProjectDto);
        setIsProcessing(false);

        const { title, description } = getProjectResponseTranslation(!!projectResponse, !!projectToUpdate);

        toast({
            title,
            description,
            status: projectResponse ? 'success' : 'error',
            duration: 9000,
            isClosable: true,
        })

        if (projectResponse) {
            navigator.push("/projects")
        }
    }

    const { co2EstimateReduction: { min, max }, listing, name } = watch()

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <Stack spacing={8}>
                <FormControl>
                    <FormLabel>{translate('PROJECT_NAME')}</FormLabel>
                    <Input  type='text' placeholder="Amazonas forestation" {...register('name', { required: true })} />
                </FormControl>
                <FormControl>
                    <FormLabel>{translate('PROJECT_DESCRIPTION')}</FormLabel>
                    <Textarea  rows={5} placeholder="Plant 12.000 autochthonous trees" {...register('description', { required: true })} />
                    <FormHelperText>{translate('PROJECT_DESCRIPTION_HELPER')}</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>{translate('CO2_EMISSIONS_SAVED')}</FormLabel>
                    <Box>
                        <RangeSlider defaultValue={[120, 240]} value={[min, max]} step={100} min={0} max={1000} onChange={(val) => setValue('co2EstimateReduction', { min: val[0], max: val[1] })}>
                            <RangeSliderTrack bg='green.100'>
                                <RangeSliderFilledTrack bg='green.700' />
                            </RangeSliderTrack>
                            <RangeSliderThumb boxSize={6} index={0}>
                                <Box color='green.600' as={FaLeaf} />
                            </RangeSliderThumb>
                            <RangeSliderThumb boxSize={6} index={1}>
                                <Box color='green.600' as={FaLeaf} />
                            </RangeSliderThumb>
                        </RangeSlider>
                        <Text textAlign='right' color='green.600'>{min} - {max} {translate('CO2e')}</Text>
                    </Box>
                    <FormHelperText
                        onClick={() => {
                            window.open(ProjectInformation.WikiLink, "_blank");
                        }}
                        cursor='pointer'
                        color='blue.300'
                    >
                        {translate('CO2E_CALCULATION_C2A')}
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>{translate('LISTING_PROPOSALS')}</FormLabel>
                    <Input type='text'
                        id='listing-proposal-input'
                        value={listItem}
                        onChange={(e) => setListItem(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                    <FormHelperText>{translate('ADD_PROPOSAL_ENTER')}</FormHelperText>
                </FormControl>
                <List spacing={3} id='listing-proposals'>
                    {listing.map((item, index) => (
                        <ListItem key={item.id}>
                            <Flex gap={4} alignItems='center'>
                                <ListIcon as={TbLeaf} color='green.500' />
                                {item.name}
                                <BsFillTrashFill size={16} onClick={() => remove(listing.findIndex(listItem => listItem.id === item.id))} cursor='pointer' />
                            </Flex>
                        </ListItem>
                    ))}
                </List>

                <Button colorScheme='green' type='submit' isLoading={isProcessing}>
                    {translate(projectToUpdate ? 'UPDATE' : 'CREATE')} {translate('PROJECT')}
                </Button>
                <Button isLoading={isProcessing} onClick={() => navigator.back()}>
                    {translate('GO_BACK')}
                </Button>
            </Stack>
        </form>
    )
}