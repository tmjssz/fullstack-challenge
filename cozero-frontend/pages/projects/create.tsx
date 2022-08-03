import { Heading, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Text } from "@chakra-ui/react"
import { useEffect } from 'react'
import AuthenticatedView from '../../layouts/AuthenticatedView'
import ProjectForm from '../../components/projects/ProjectForm'

const CreateProjectPage: NextPage = () => {
  useEffect(() => {

  }, [])


  return (
    <AuthenticatedView>
      <Stack spacing={8}>
        <Heading>
          Create Project
        </Heading>
        <ProjectForm />
      </Stack>
    </AuthenticatedView>
  )
}

export default CreateProjectPage
