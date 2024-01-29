import sendButtonImg from '../../assets/homePage/sendButton.png';
import { useAddMessageMutation } from '../../api/HomeMessagesApi.js';
import { useSelector } from 'react-redux';
import { Formik, Field } from 'formik';
import { useTranslation } from 'react-i18next';

const NewMessage = () => {
  const [addMessage] = useAddMessageMutation();
  const { currentChannelId } = useSelector((state) => state.app);
  const { t } = useTranslation();

  const handleAddMessage = async (body, channelId, resetForm) => {
    const username = localStorage.getItem('username');

    await addMessage({ body, channelId, username });
    resetForm();
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik initialValues={{ body: '' }} onSubmit={({ body }, { resetForm }) => handleAddMessage(body, currentChannelId, resetForm)}>
        {({ values, handleSubmit }) => (
          <form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
            <div className="input-group has-validation">
              <Field
                type="text"
                name="body"
                aria-label="Новое сообщение"
                placeholder={t('homePage.newMessage')}
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
  );
};

export default NewMessage;
