import { createSlice } from '@reduxjs/toolkit';

const defaultChannelName = 'general';

const initialState = {
  currentChannel: defaultChannelName,
  currentChannelId: '1',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeChannel: (state, action) => {
      const { name, id } = action.payload;

      state.currentChannel = name;
      state.currentChannelId = id;
    },
  },
});

export const { changeChannel } = appSlice.actions;

export default appSlice.reducer;
