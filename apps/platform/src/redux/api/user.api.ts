import { createApi } from '@reduxjs/toolkit/query/react'
import { setUser } from '../slices/user.slice'
import customFetchBase from './customFetchBase'
import { UserInterface } from '@isomera/interfaces'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  tagTypes: ['User'],
  endpoints: builder => ({
    getMe: builder.query<UserInterface, null>({
      query() {
        return {
          url: 'users/me',
          credentials: 'include'
        }
      },
      transformResponse: (result: { data: { user: UserInterface } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          console.error(error)
        }
      }
    })
  })
})
