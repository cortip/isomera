import { useContext } from 'react'
import AuthContext from '../contexts/authContext'

function useSession() {
  return useContext(AuthContext)
}

export default useSession
