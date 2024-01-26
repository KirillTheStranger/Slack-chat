import { useGetChannelsQuery } from '../api/HomeChannelsApi.js';
import { useGetMessagesQuery, useAddMessageMutation } from '../api/HomeMessagesApi.js';
import sendButtonImg from '../assets/homePage/sendButton.png';
import addChannelImg from '../assets/homePage/addChannelButton.png';
import { useSelector, useDispatch } from 'react-redux';
import { changeChannel, changeModalState, changeEditMenuState, changeEditMenuId } from '../store/slices/app.js';
import { Formik, Field } from 'formik';
import { socket } from '../socket.js';
import { useEffect } from 'react';
import AddChannelModal from '../components/AddChannelModal.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const { currentChannel, currentChannelId, isModalOpened, editMenuOpened, editMenuId } = useSelector((state) => state.app);
  const { addChannelModalOpened, editChannelModalOpened, removeChannelModalOpened } = isModalOpened;

  const [addMessage] = useAddMessageMutation();
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

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
    };
  }, [messageRefetch, channelsRefetch]);

  const handleOpenEditMenu = (id) => {
    dispatch(changeEditMenuState());
    dispatch(changeEditMenuId(id));
  };

  const createChannel = (channel) => {
    const commonPart = (
      <button
        type="button"
        onClick={() => dispatch(changeChannel({ name: channel.name, id: channel.id }))}
        className={`w-100 rounded-0 text-start btn ${currentChannel === channel.name ? 'btn-secondary' : ''}`}
      >
        <span className="me-1">#</span>
        {channel.name}
      </button>
    );

    const nonRemovableChannel = (
      <li className="nav-item w-100" key={channel.id}>
        {commonPart}
      </li>
    );

    const removableChannel = (
      <li className="nav-item w-100" key={channel.id}>
        <div role="group" className={`d-flex dropdown btn-group ${editMenuOpened && editMenuId === channel.id ? 'show' : ''}`}>
          {commonPart}
          <button
            onClick={() => handleOpenEditMenu(channel.id)}
            type="button"
            aria-expanded={(editMenuOpened && editMenuId === channel.id) || false}
            id={channel.id}
            className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${currentChannel === channel.name ? 'btn-secondary' : ''}`}
          >
            <span className="visually-hidden">Управление каналом</span>
          </button>
          <div
            x-placement="bottom-start"
            aria-labelledby={channel.id}
            className={`dropdown-menu ${editMenuOpened && editMenuId === channel.id ? 'show' : ''}`}
            data-popper-reference-hidden="false"
            data-popper-escaped="false"
            data-popper-placement="bottom-start"
            style={{ position: 'absolute', inset: '0px auto auto 0px', transform: 'translate(-8px, 40px)' }}
          >
            <a data-rr-ui-dropdown-item className="dropdown-item" role="button" tabIndex={0} href="#">
              Удалить
            </a>
            <a data-rr-ui-dropdown-item className="dropdown-item" role="button" tabIndex={0} href="#">
              Переименовать
            </a>
          </div>
        </div>
      </li>
    );

    return channel.removable ? removableChannel : nonRemovableChannel;
  };

  const createMessage = (message) => (
    <div className="text-break mb-2" key={message.id}>
      <b>{message.username}</b>: {message.body}
    </div>
  );

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
              <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(changeModalState('addChannel'))}>
                <img src={addChannelImg} alt="Создать новый канал" width="20" height="20" />
              </button>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
              {channels && channels.map((channel) => createChannel(channel))}
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
                {currentChannelMessages && currentChannelMessages.map((message) => createMessage(message))}
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
    </>
  );
};

export default Home;
