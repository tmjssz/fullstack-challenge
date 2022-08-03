import { Text, Button, Flex, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FormEvent, useEffect, useState } from 'react'
import UserService from '../services/UserService'
import { signIn, useSession } from 'next-auth/react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { translate } from '../utils/language.utils'
import { FRONTEND_URL } from '../constants/backend.constants'

const Register: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast()
  const router = useRouter();
  const { data: session} = useSession()

  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [session, router])
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const user = await UserService.register({ email, password })

      if (user) {
        signIn('credentials', { email, password, callbackUrl: `${FRONTEND_URL}projects` }) // NextAuth will sign in the user
      }
    } catch (error) {
      console.log('error registering user', error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={8}>
          <FormControl isRequired>
            <FormLabel htmlFor='email'>{translate('EMAIL')}</FormLabel>
            <Input name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} id='email' placeholder='Email' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='password'>{translate('PASSWORD')}</FormLabel>
            <Input name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} id='password' />
          </FormControl>
          <Button type='submit'>{translate('CREATE_ACCOUNT')}</Button>
        </Stack>
      </form>
      <Flex gap={1} marginY={4}>
        <Text>{translate('ALREADY_HAVE_AN_ACCOUNT')}</Text>
        <Text fontWeight='bold' color='blue.700' cursor={'pointer'} onClick={() => router.push('/api/auth/signin')}>{translate('SIGN_IN')}</Text>
      </Flex>
    </>
  )
}

export default Register
