import { useGetChannelsQuery } from '../api/HomeChannelsApi.js';
import { useGetMessagesQuery } from '../api/HomeMessagesApi.js';
import { changeChannel } from '../store/slices/app.js';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../socket.js';
import { useEffect } from 'react';
import AddChannelModal from '../containers/Modals/AddChannelModal.jsx';
import EditChannelModal from '../containers/Modals/EditChannelModal.jsx';
import RemoveChannelModal from '../containers/Modals/RemoveChannelModal.jsx';
import Channels from '../containers/Channels/Channels.jsx';
import Messages from '../containers/Messages/Messages.jsx';
import NewMessage from '../containers/Messages/NewMessage.jsx';

const Home = () => {
  const dispatch = useDispatch();

  const {
    currentChannelId,
    isModalOpened: { addChannelModalOpened, editChannelModalOpened, removeChannelModalOpened },
  } = useSelector((state) => state.app);
  const { data: channels, refetch: channelsRefetch, status } = useGetChannelsQuery();
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
      {addChannelModalOpened && <AddChannelModal />}
      {editChannelModalOpened && <EditChannelModal />}
      {removeChannelModalOpened && <RemoveChannelModal status={status} />}
    </>
  );
};

export default Home;
