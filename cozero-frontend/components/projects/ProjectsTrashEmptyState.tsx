import React from "react";
import { Heading, Container, Text, Button } from "@chakra-ui/react";
import { translate } from "../../utils/language.utils";
import { TbMoodEmpty } from "react-icons/tb";
import { useNavigate } from "react-router";
import { MdArrowBackIosNew } from "react-icons/md";

export const ProjectsTrashEmptyState = () => {
  const navigate = useNavigate();

  return (
    <Container
      gap={5}
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      flexDirection="column"
    >
      <TbMoodEmpty size={60} />
      <Heading size="lg" textAlign="center">
        {translate("NO_DELETED_PROJECTS_TITLE")}
      </Heading>
      <Button leftIcon={<MdArrowBackIosNew />} onClick={() => navigate("/projects")}>
        {translate("BACK_TO_PROJECTS")}
      </Button>
    </Container>
  );
};
