import { BACKEND_URL, FRONTEND_URL } from "../constants/backend.constants";
import { CreateProjectDto, DeleteProjectResult, Project, UpdateProjectDto, UpdateProjectResult } from "../interfaces/project.interface";
import HTTPService from "./HTTPService";

class ProjectsService {
    public async fetchProjects(): Promise<Project[] | undefined> {
        try {
            const response = await fetch(`${FRONTEND_URL}api/projects`)

            return response.json() as Promise<Project[] | undefined>
        }
        catch (e) {
            console.log('Error fetching projects', e)
            return Promise.resolve([])
        }
    }

    public async fetchProjectById(id: string): Promise<Project | undefined> {
        try {
            const response = await fetch(`${BACKEND_URL}projects/${id}`)

            return response.json() as Promise<Project | undefined>
        }
        catch (e) {
            console.log('Error fetching project', e)
            return Promise.resolve(undefined)
        }
    }

    public async updateProject(updatedProject: UpdateProjectDto): Promise<UpdateProjectResult | undefined> {
        try {
            return HTTPService.put(`${FRONTEND_URL}api/projects/${updatedProject.id}`, updatedProject)
        } catch (e) {
            console.log('Error deleting project', e)
        }
    }


    public async createProject(createProjectDto: CreateProjectDto): Promise<Project | undefined> {
        try {
            const response = await fetch(`${FRONTEND_URL}api/projects/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(createProjectDto)
            })

            return response.json() as Promise<Project | undefined>
        }
        catch (e) {
            console.log('Error creating project', e)
        }
    }

    public async deleteProject(id: string): Promise<DeleteProjectResult | undefined> {
        try {
            return HTTPService.delete(`${FRONTEND_URL}api/projects/${id}`)
        } catch (e) {
            console.log('Error deleting project', e)
        }
    }

    public sortProjects = (projects: Project[] | undefined) => {
        return projects?.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        );
    }

}

export default new ProjectsService()