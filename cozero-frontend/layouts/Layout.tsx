import { Box, Container } from "@chakra-ui/react"
import Header from "./Header"
import Footer from "./Footer"

interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <>
            <Header />
            <main>
                <Container p={10}>
                    {children}
                </Container>
            </main>
            <Footer />
        </>
    )
}