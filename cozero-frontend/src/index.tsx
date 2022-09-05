import { Button, Link, Stack } from '@chakra-ui/react'
import { Text } from "@chakra-ui/react"
import { useNavigate } from 'react-router'
import { translate } from '../utils/language.utils'

const Home = () => {
  const navigate = useNavigate()
  return (
    <Stack spacing={8} justifyContent='center'>
      <Text
        bgGradient='linear(to-l, #66cc33, #66cc33)'
        bgClip='text'
        fontSize='6xl'
        fontWeight='extrabold'
        textAlign='center'
      >
        {translate('HOMEPAGE_TITLE')}
      </Text>
      <Text textAlign='justify'>
        {translate('HOMEPAGE_SUBTITLE')}
      </Text>
        <Button
        onClick={() => navigate('/projects')}
        >
          {translate('HOMEPAGE_CTA_BUTTON')}
          </Button>
    </Stack>
  )
}

export default Home
