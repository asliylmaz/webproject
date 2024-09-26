import { createSlice } from '@reduxjs/toolkit';

const vimeoSlice = createSlice({
  name: 'vimeo',
  initialState: {
    vimeoLink: null,
  },
  reducers: {
    setVimeoLink: (state, action) => {
      state.vimeoLink = action.payload;
    },
  },
});

export const { setVimeoLink } = vimeoSlice.actions;

export default vimeoSlice.reducer;
