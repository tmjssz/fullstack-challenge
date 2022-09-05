import { Heading, Stack } from '@chakra-ui/react'
import AuthenticatedView from '../../layouts/AuthenticatedView'
import ProjectForm from '../../components/projects/ProjectForm'
import { translate } from '../../utils/language.utils'

const CreateProjectPage = () => (
  <AuthenticatedView>
    <Stack spacing={8}>
      <Heading>
        {translate('CREATE_PROJECT')}
      </Heading>
      <ProjectForm />
    </Stack>
  </AuthenticatedView>
)

export default CreateProjectPage
