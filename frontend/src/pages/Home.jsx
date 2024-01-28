import { useGetChannelsQuery } from '../api/HomeChannelsApi.js';
import { useGetMessagesQuery } from '../api/HomeMessagesApi.js';
import { useSelector } from 'react-redux';
import { socket } from '../socket.js';
import { useEffect } from 'react';
import AddChannelModal from '../containers/Modals/AddChannelModal.jsx';
import EditChannelModal from '../containers/Modals/EditChannelModal.jsx';
import RemoveChannelModal from '../containers/Modals/RemoveChannelModal.jsx';
import Channels from '../containers/Channels/Channels.jsx';
import Messages from '../containers/Messages/Messages.jsx';
import NewMessage from '../containers/Messages/NewMessage.jsx';

const Home = () => {
  const {
    isModalOpened: { addChannelModalOpened, editChannelModalOpened, removeChannelModalOpened },
  } = useSelector((state) => state.app);
  const { data: channels, refetch: channelsRefetch } = useGetChannelsQuery();
  const { data: messages, refetch: messageRefetch } = useGetMessagesQuery();

  useEffect(() => {
    const handleNewMessage = (message) => {
      messageRefetch();
    };

    const handleNewChannel = (channel) => {
      channelsRefetch();
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('renameChannel', handleNewChannel);
    socket.on('removeChannel', handleNewChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('renameChannel', handleNewChannel);
      socket.off('removeChannel', handleNewChannel);
    };
  }, [messageRefetch, channelsRefetch]);

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
      {removeChannelModalOpened && <RemoveChannelModal />}
    </>
  );
};

export default Home;
