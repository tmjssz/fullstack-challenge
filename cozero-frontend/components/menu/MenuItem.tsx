import { Box, Text } from '@chakra-ui/react'

import { useLocation, useNavigate, useRoutes } from 'react-router';

interface Props {
    title: string;
    href: string
}

export default function MenuItem({ title, href }: Props) {
  const navigate = useNavigate()
  const router = useLocation()

  const handleClick = () => {
    navigate(href)
  }

  return (
    <Box as='a' href={href} onClick={handleClick} color={router.pathname === href ? 'black.700' : 'gray.500'}>
      <Text fontWeight='bold'>
        {title}
      </Text>
    </Box>
  )
}