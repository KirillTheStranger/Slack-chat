import sendButtonImg from '../../assets/homePage/sendButton.png';
import { useAddMessageMutation } from '../../api/HomeMessagesApi.js';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

const NewMessage = () => {
  const [addMessage] = useAddMessageMutation();
  const { currentChannelId } = useSelector((state) => state.app);
  const { t } = useTranslation();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleAddMessage = async (body, channelId, resetForm) => {
    const username = localStorage.getItem('username');
    const filteredMessage = filter.clean(body);

    await addMessage({ body: filteredMessage, channelId, username });
    resetForm();
  };

  return (
    <FormGroup className="mt-auto px-5 py-3">
      <Formik initialValues={{ body: '' }} onSubmit={({ body }, { resetForm }) => handleAddMessage(body, currentChannelId, resetForm)}>
        {({ values, handleSubmit, handleChange }) => (
          <form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
            <FormGroup className="input-group has-validation">
              <FormControl
                type="text"
                name="body"
                value={values.body}
                onChange={handleChange}
                aria-label="Новое сообщение"
                placeholder={t('homePage.newMessage')}
                className="border-0 p-0 ps-2 form-control"
                ref={inputRef}
              />
              <button type="submit" className="btn btn-group-vertical" disabled={!values.body.trim()} style={{ border: 'none' }}>
                <img src={sendButtonImg} alt="Отправить сообщение" width="20" height="20" />
              </button>
            </FormGroup>
          </form>
        )}
      </Formik>
    </FormGroup>
  );
};

export default NewMessage;
