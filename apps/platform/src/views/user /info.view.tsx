import { useLogoutPerformForm, useUserHook } from '@isomera/impl'
import { toast } from 'react-toastify'

export const UserInfoView = () => {
  const { data, isFetched } = useUserHook()

  const onSuccess = (message: string) => {
    toast.success(message)
  }

  const onError = (message: string) => {
    toast.error(message)
  }

  const { handleClick } = useLogoutPerformForm(onSuccess, onError)

  return (
    <div>
      Profile here
      <div>First Name: {data?.firstName}</div>
      <div>Last Name: {data?.lastName}</div>
      <div>
        <button type="button" onClick={handleClick}>
          Logout
        </button>
      </div>
    </div>
  )
}
