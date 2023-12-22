import { clearAuthState, pages, useLogoutPerformForm } from '@isomera/impl'
import { toast } from 'react-toastify'
import useSession from '../../hooks/useSession'
import { useNavigate } from 'react-router-dom'

export const UserInfoView = () => {
  const { user, setUser } = useSession()
  const navigate = useNavigate()

  const onSuccess = (message: string) => {
    toast.success(message)
    setUser(undefined)
    clearAuthState()
    navigate(pages.login.path)
  }

  const onError = (message: string) => {
    toast.error(message)
  }

  const { handleClick } = useLogoutPerformForm(onSuccess, onError)

  return (
    <div>
      Profile here
      <div>First Name: {user?.firstName}</div>
      <div>Last Name: {user?.lastName}</div>
      <div>
        <button type="button" onClick={handleClick}>
          Logout
        </button>
      </div>
    </div>
  )
}
