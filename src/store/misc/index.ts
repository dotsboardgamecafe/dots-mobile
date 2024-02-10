import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  main: false,
  profile: false
}

export const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    onHasLandingAction: (state, action) => {
      console.log(action.payload)
      state.main = action.payload === 'main'
      state.profile = action.payload === 'profile'
    }
  }
})

export const { onHasLandingAction } = miscSlice.actions