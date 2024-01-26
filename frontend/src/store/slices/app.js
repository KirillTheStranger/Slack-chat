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
  editMenuOpened: false,
  editMenuId: null,
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
      const modalName = action.payload;
      state.isModalOpened[`${modalName}ModalOpened`] = !state.isModalOpened[`${modalName}ModalOpened`];
    },
    changeEditMenuState: (state) => {
      state.editMenuOpened = !state.editMenuOpened;
    },
    changeEditMenuId: (state, action) => {
      const id = action.payload;
      id ? (state.editMenuId = id) : (state.editMenuId = null);
    },
  },
});

export const { changeChannel, changeModalState, changeEditMenuState, changeEditMenuId } = appSlice.actions;

export default appSlice.reducer;
