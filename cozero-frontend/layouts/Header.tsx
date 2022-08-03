import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
import Menu from "../components/menu/Menu";
import SignInButton from "../components/SignInButton";
import { translate } from "../utils/language.utils";

export default function Header() {
    const router = useRouter()

    return (
        <header>
            <Flex justifyContent='space-between' p={6}>
                <Menu />
                <Flex alignItems='center' gap={4}>
                    <Button
                        variant="outline"
                        id='new-project'
                        leftIcon={<AiOutlinePlus />}
                        onClick={() => {
                            router.push("/projects/create")
                        }}
                    >
                        {translate('NEW_PROJECT')}
                    </Button>
                    <SignInButton />
                </Flex>

            </Flex>
        </header>
    );
}