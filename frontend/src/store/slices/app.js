import { createSlice } from '@reduxjs/toolkit';

const defaultChannelName = 'general';

const initialState = {
  currentChannel: defaultChannelName,
  currentChannelId: '1',
  isModalOpened: {
    addChannelModalOpened: false,
    editChannelModalOpened: false,
    removeChannelModalOpened: false,
  },
  editChannelId: null,
  channelNames: [],
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
    changeModalState: (state, action) => {
      const { modalName, editChannelId } = action.payload;
      state.isModalOpened[`${modalName}ModalOpened`] = !state.isModalOpened[`${modalName}ModalOpened`];

      if (editChannelId || editChannelId === null) {
        state.editChannelId = editChannelId;
      }
    },
    setChannels: (state, action) => {
      const channelNames = action.payload;
      state.channelNames = [...channelNames];
    },
  },
});

export const { changeChannel, changeModalState, setChannels } = appSlice.actions;

export default appSlice.reducer;
