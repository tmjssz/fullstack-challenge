import { Text, Button, Flex, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import UserService from '../services/UserService'
import { translate } from '../utils/language.utils'

interface Props {
  isSignUp: boolean
}

const LoginPage = ({ isSignUp }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { signUp, logIn } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      isSignUp ? await signUp({ email, password }) : await logIn({ email, password })
    } catch (error) {
      console.log('error registering user', error)
    }
  }

  const isButtonDisabled = email.length === 0 || password.length === 0

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
          <Button disabled={isButtonDisabled} type='submit'>{translate(isSignUp ? 'CREATE_ACCOUNT' : 'SIGN_IN')}</Button>
        </Stack>
      </form>
      {!isSignUp && (
        <Flex gap={1} marginY={4}>
          <Text>{translate('ALREADY_HAVE_AN_ACCOUNT')}</Text>
          <Text fontWeight='bold' color='blue.700' cursor={'pointer'} onClick={() => navigate('/api/auth/signin')}>{translate('SIGN_IN')}</Text>
        </Flex>
      )}
    </>
  )
}

export default LoginPage
