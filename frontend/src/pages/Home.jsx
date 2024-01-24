import { useGetChannelsQuery } from '../api/HomeChannelsApi.js';
import { useGetMessagesQuery } from '../api/HomeMessagesApi.js';
import sendButtonImg from '../assets/homePage/sendButton.png';

const Home = () => {
  const createChannel = (channel) => (
    <li className="nav-item w-100" key={channel.id}>
      <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
        <span className="me-1">#</span>
        {channel.name}
      </button>
    </li>
  );

  const createMessage = (message) => (
    <div className="text-break mb-2" key={message.id}>
      <b>{message.userName}</b>
      {message.body}
    </div>
  );

  const { data: channels } = useGetChannelsQuery();
  const { data: messages } = useGetMessagesQuery();

  console.log(messages);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical"></button>
          </div>
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {channels && channels.map((channel) => createChannel(channel))}
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>#</b>
              </p>
              <span className="text-muted"># сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {messages && messages.map((message) => createMessage(message))}
            </div>
            <div className="mt-auto px-5 py-3">
              <form noValidate className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <input type="text" name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" />
                  <button type="submit" className="btn btn-group-vertical">
                    <img src={sendButtonImg} alt="Отправить сообщение" width="20" height="20" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
