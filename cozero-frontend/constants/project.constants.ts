import { CreateProjectDto, ProjectForm } from "../interfaces/project.interface";

export const createProjectDefaultValues: ProjectForm = {
    name: "",
    description: "",
    listing: [],
    co2EstimateReduction: {
        min: 100,
        max: 500
    },
    owner: ""
}