import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInterface } from '@isomera/interfaces'

interface IUserState {
  user: UserInterface | null
}

const initialState: IUserState = {
  user: null
}

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<UserInterface>) => {
      state.user = action.payload
    }
  }
})

export default userSlice.reducer

export const { logout, setUser } = userSlice.actions
