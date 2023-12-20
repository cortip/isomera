import { useUserHook } from "@isomera/impl"

export const UserInfoView = () => {
  const {data, isFetched} = useUserHook()
    return (
        <div>
          Profile here
          <div>
            First Name: {data?.firstName}
          </div>
          <div>
            Last Name: {data?.lastName}
          </div>
        </div>
    )
  }