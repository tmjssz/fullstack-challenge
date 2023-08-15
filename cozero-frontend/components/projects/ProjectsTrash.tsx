import { Heading, Stack, useToast, Link } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProjectsEmptyState } from "./ProjectsEmptyState";
import { Project } from "../../interfaces/project.interface";
import ProjectsService from "../../services/ProjectsService";
import { translate } from "../../utils/language.utils";
import ProjectItem from "./ProjectItem";
import { useSearchParams, Link as ReactRouterLink } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

export default function ProjectsTrash() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();

  const query = useMemo(() => searchParams.get("q"), [searchParams]);

  const fetchProjects = useCallback(async (query: string | null) => {
    const projects = await ProjectsService.fetchDeletedProjects();
    if (projects) {
      setProjectList(projects);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects(query);
  }, [fetchProjects, query]);

  if (projectList.length === 0 && !isLoading) {
    return <ProjectsEmptyState query={query} />;
  }

  return (
    <>
      <Link as={ReactRouterLink} to="/projects">
        <MdArrowBackIosNew style={{ display: 'inline-block' }} />
        {translate("BACK_TO_PROJECTS")}
      </Link>
      <Stack spacing={8}>
        <Heading>{translate("DELETED_PROJECTS")}</Heading>
        {projectList?.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </Stack>
    </>
  );
}
