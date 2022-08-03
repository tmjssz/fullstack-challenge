import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react';

interface Props {
    title: string;
    href: string
}

export default function MenuItem({ title, href }: Props) {
  const router = useRouter()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <Box as='a' href={href} onClick={handleClick} color={router.asPath === href ? 'black.700' : 'gray.500'}>
      <Text fontWeight='bold'>
        {title}
      </Text>
    </Box>
  )
}