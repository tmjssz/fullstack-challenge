import { Box, Container } from "@chakra-ui/react"
import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"
import { ProjectInformation } from "../enums/projectInformation.enum"

interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {

    return (
        <>
            <Head>
                <title>{ProjectInformation.ProjectName}</title>
                <meta name="description" content={ProjectInformation.ProjectDescription} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
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