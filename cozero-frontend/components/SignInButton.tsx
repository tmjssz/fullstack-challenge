import { Box, Avatar, Text, Flex } from "@chakra-ui/react";
import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignInButton() {
    const { data: session } = useSession()
    const router = useRouter()

    return (
        <Flex id='signup' onClick={() => session ? signOut() : router.push('/register')} gap={4} cursor='pointer'>
            <Text>{session ? 'Sign out' : 'Sign up'}</Text>
            <Avatar name={session?.user?.email as string | undefined} size="sm" />
        </Flex>
    )
}