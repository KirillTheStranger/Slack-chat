import { createSlice } from '@reduxjs/toolkit';

const defaultChannelName = 'general';

const initialState = {
  currentChannel: defaultChannelName,
  currentChannelId: '1',
  editChannelId: null,
  channelNames: [],
  modals: {
    isModalOpened: false,
    modalType: null,
  },
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
      const { isModalOpened, modalType, editChannelId } = action.payload;
      state.modals.isModalOpened = isModalOpened;
      state.modals.modalType = modalType;

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
