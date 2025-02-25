import { AuthContext } from "@/providers/AuthProvider"
import { useContext } from "react"

const useAuth = () => {
    const user = useContext(AuthContext)

    return user
}

export default useAuth