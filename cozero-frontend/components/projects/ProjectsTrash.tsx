import { Heading, Stack, useToast, Link } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProjectsTrashEmptyState } from "./ProjectsTrashEmptyState";
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
  const toast = useToast();

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

  const onRestore = async (projectId: string) => {
    const restoredProject = await ProjectsService.restoreProject(projectId);    

    toast({
      title: translate(
        restoredProject ? "PROJECT_RESTORED" : "PROJECT_RESTORED_ERROR"
      ),
      description: translate(
        restoredProject
          ? "PROJECT_RESTORED_DESCRIPTION"
          : "PROJECT_RESTORE_ERROR_DESCRIPTION"
      ),
      status: restoredProject ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });

    if (restoredProject) {
      setProjectList(projectList.filter((project) => project.id !== projectId));
    }
  };

  if (projectList.length === 0 && !isLoading) {
    return <ProjectsTrashEmptyState />;
  }

  return (
    <>
      <Link as={ReactRouterLink} to="/projects">
        <MdArrowBackIosNew style={{ display: "inline-block" }} />
        {translate("BACK_TO_PROJECTS")}
      </Link>
      <Stack spacing={8}>
        <Heading>{translate("DELETED_PROJECTS")}</Heading>
        {projectList?.map((project) => (
          <ProjectItem key={project.id} project={project} onRestore={onRestore} />
        ))}
      </Stack>
    </>
  );
}
