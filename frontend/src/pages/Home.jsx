import { useGetChannelsQuery } from '../api/HomeChannelsApi.js';
import { useGetMessagesQuery, useAddMessageMutation } from '../api/HomeMessagesApi.js';
import sendButtonImg from '../assets/homePage/sendButton.png';
import addChannelImg from '../assets/homePage/addChannelButton.png';
import { useSelector, useDispatch } from 'react-redux';
import { changeModalState, setChannels } from '../store/slices/app.js';
import { Formik, Field } from 'formik';
import { socket } from '../socket.js';
import { useEffect } from 'react';
import AddChannelModal from '../containers/AddChannelModal.jsx';
import EditChannelModal from '../containers/EditChannelModal.jsx';
import Channel from '../containers/Channel.jsx';
import Message from '../components/Message.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const { currentChannel, currentChannelId, isModalOpened, ediChannelId } = useSelector((state) => state.app);
  const { addChannelModalOpened, editChannelModalOpened, removeChannelModalOpened } = isModalOpened;

  const [addMessage] = useAddMessageMutation();
  const { data: channels, refetch: channelsRefetch } = useGetChannelsQuery();
  const { data: messages, refetch: messageRefetch } = useGetMessagesQuery();

  const getChannelNames = (channels) => {
    if (!channels) {
      return [];
    }
    const channelNames = channels.map(({ name }) => name);
    return channelNames;
  };

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

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('renameChannel', handleNewChannel);
    };
  }, [messageRefetch, channelsRefetch]);

  useEffect(() => {
    if (channels) {
      const cNames = getChannelNames(channels);
      dispatch(setChannels(cNames));
    }
  }, [channels, dispatch]);

  const getCurrentChannelMessages = (messages, currentChannelId) => {
    if (!messages) {
      return [];
    }

    const curChannelMessages = messages.filter((message) => message.channelId === currentChannelId);
    return curChannelMessages;
  };

  const handleAddMessage = async (body, channelId, resetForm) => {
    const username = localStorage.getItem('username');

    await addMessage({ body, channelId, username });
    resetForm();
  };

  const currentChannelMessages = getCurrentChannelMessages(messages, currentChannelId);
  const messageCount = currentChannelMessages.length;

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(changeModalState({ modalName: 'addChannel' }))}>
                <img src={addChannelImg} alt="Создать новый канал" width="20" height="20" />
              </button>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
              {channels && channels.map((channel) => <Channel channel={channel} key={channel.id} />)}
            </ul>
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># {currentChannel}</b>
                </p>
                <span className="text-muted">{messageCount} сообщений</span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5">
                {currentChannelMessages && currentChannelMessages.map((message) => <Message message={message} key={message.id} />)}
              </div>
              <div className="mt-auto px-5 py-3">
                <Formik initialValues={{ body: '' }} onSubmit={({ body }, { resetForm }) => handleAddMessage(body, currentChannelId, resetForm)}>
                  {({ values, handleSubmit }) => (
                    <form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
                      <div className="input-group has-validation">
                        <Field
                          type="text"
                          name="body"
                          aria-label="Новое сообщение"
                          placeholder="Введите сообщение..."
                          className="border-0 p-0 ps-2 form-control"
                          autoFocus
                        />
                        <button type="submit" className="btn btn-group-vertical" disabled={!values.body.trim()}>
                          <img src={sendButtonImg} alt="Отправить сообщение" width="20" height="20" />
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      {addChannelModalOpened && <AddChannelModal />}
      {editChannelModalOpened && <EditChannelModal />}
    </>
  );
};

export default Home;
