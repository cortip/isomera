import useSession from '../../hooks/useSession'

export const UserInfoView = () => {
  const { user } = useSession()

  return (
    <div>
      Profile here
      <div>First Name: {user?.firstName}</div>
      <div>Last Name: {user?.lastName}</div>
    </div>
  )
}
