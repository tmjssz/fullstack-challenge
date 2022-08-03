import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"

interface Props {
    children: React.ReactNode
}

export default function AuthenticatedView({ children }: Props) {
    const { data: session, status } = useSession()
    const isUser = !!session?.user

    
    useEffect(() => {
      if (status === "loading") {
        return
      }

      if (!isUser) {
        signIn()
      }

    }, [isUser, status])
  
    if (isUser) {
      return <>{children}</>
    }
  
    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return <div>Loading...</div>
  }
    