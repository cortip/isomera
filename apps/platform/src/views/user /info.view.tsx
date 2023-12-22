import { clearAuthState, useLogoutPerformForm } from '@isomera/impl'
import { toast } from 'react-toastify'
import useSession from '../../hooks/useSession'

export const UserInfoView = () => {
  const { user } = useSession()

  const onSuccess = (message: string) => {
    toast.success(message)
    clearAuthState()
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
