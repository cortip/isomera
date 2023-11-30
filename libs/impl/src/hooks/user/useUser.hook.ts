import { useQuery } from 'react-query'

import { getUserService } from '../../services/user/getUser.service'

export const useUserHook = () => {
  const {
    data,
    isFetched,
    refetch: mutate
  } = useQuery(['user'], getUserService, {
    retry: false
  })

  return {
    data,
    isFetched,
    mutate
  }
}
