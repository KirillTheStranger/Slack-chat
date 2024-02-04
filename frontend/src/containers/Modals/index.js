import AddChannel from './addChannel.jsx';
import RenameChannel from './renameChannel.jsx';
import RemoveChannel from './removeChannel.jsx';

const modals = {
  adding: AddChannel,
  renaming: RenameChannel,
  removing: RemoveChannel,
};

const getModal = (modalName) => modals[modalName];

export default getModal;
