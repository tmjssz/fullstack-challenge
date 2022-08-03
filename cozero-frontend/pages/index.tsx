import { Button, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Text } from "@chakra-ui/react"
import Link from 'next/link'
import { translate } from '../utils/language.utils'

const Home: NextPage = () => {
  return (
        <Stack spacing={8}>
          <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='6xl'
            fontWeight='extrabold'
            textAlign='center'
          >
            {translate('HOMEPAGE_TITLE')}
          </Text>
          <Text textAlign='center'>
          {translate('HOMEPAGE_SUBTITLE')}
          </Text>
          <Link href="/projects">
            <Button>{translate('HOMEPAGE_CTA_BUTTON')}</Button>
        </Link>
        </Stack>
  )
}

export default Home
