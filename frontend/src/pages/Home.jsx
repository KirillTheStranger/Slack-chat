import { useGetChannelsQuery } from '../api/HomeChannelsApi.js';
import { useGetMessagesQuery } from '../api/HomeMessagesApi.js';
import { changeChannel } from '../store/slices/app.js';
import { changeModalState } from '../store/slices/app.js';
import Channels from '../containers/Channels/Channels.jsx';
import Messages from '../containers/Messages/Messages.jsx';
import NewMessage from '../containers/Messages/NewMessage.jsx';
import getModal from '../containers/Modals/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../socket.js';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const renderModal = ({ isModalOpened, modalType, handleCloseModal }) => {
  if (!isModalOpened) {
    return null;
  }

  const Component = getModal(modalType);
  return <Component handleCloseModal={handleCloseModal} />;
};

const Home = () => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(changeModalState({ isModalOpened: false, modalType: null, editChannelId: null }));
  };

  const {
    currentChannelId,
    modals: { isModalOpened, modalType },
  } = useSelector((state) => state.app);

  const { data: channels, refetch: channelsRefetch } = useGetChannelsQuery();
  const { data: messages, refetch: messageRefetch } = useGetMessagesQuery();

  useEffect(() => {
    const handleNewMessage = () => {
      messageRefetch();
    };

    const handleNewChannel = () => {
      channelsRefetch();
    };

    const handleRemoveChannel = ({ id }) => {
      if (currentChannelId === id) {
        dispatch(changeChannel({ name: 'general', id: '1' }));
      }
      channelsRefetch();
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('renameChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('renameChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
    };
  }, [messageRefetch, channelsRefetch, currentChannelId]);

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels channels={channels} />
          <Messages messages={messages}>
            <NewMessage></NewMessage>
          </Messages>
        </div>
      </div>
      <ToastContainer />
      {renderModal({ isModalOpened, modalType, handleCloseModal })}
    </>
  );
};

export default Home;
