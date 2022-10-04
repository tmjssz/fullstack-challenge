import { useEffect } from "react"

interface Props {
    children: React.ReactNode
}

export default function AuthenticatedView({ children }: Props) {
    const isUser = true

    
    useEffect(() => {
      if (status === "loading") {
        return
      }

      if (!isUser) {
        return
      }

    }, [])
  
    if (isUser) {
      return <>{children}</>
    }
  
    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return <div>Loading...</div>
  }
    