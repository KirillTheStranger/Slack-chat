import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import sendButtonImg from '../../assets/homePage/sendButton.png';
import { useAddMessageMutation } from '../../api/homeMessagesApi.js';
import useLocalStorage from '../../hooks/useLocalstorage.js';

const NewMessage = () => {
  const [addMessage] = useAddMessageMutation();
  const { currentChannelId } = useSelector((state) => state.app);
  const { t } = useTranslation();
  const userName = useLocalStorage('get')('username');

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleAddMessage = async (body, channelId, resetForm, username) => {
    const filteredMessage = filter.clean(body);

    await addMessage({ body: filteredMessage, channelId, username });
    resetForm();
  };

  return (
    <FormGroup className="mt-auto px-5 py-3">
      <Formik initialValues={{ body: '' }} onSubmit={({ body }, { resetForm }) => handleAddMessage(body, currentChannelId, resetForm, userName)}>
        {({
          values, handleChange, isSubmitting,
        }) => (
          <Form noValidate className="py-1 border rounded-2">
            <FormGroup className="input-group has-validation">
              <FormControl
                type="text"
                name="body"
                value={values.body}
                onChange={handleChange}
                aria-label={t('homePage.newMessageInput')}
                placeholder={t('homePage.newMessagePlaceholder')}
                className="border-0 p-0 ps-2 form-control"
                ref={inputRef}
                disabled={isSubmitting}
              />
              <button type="submit" className="btn btn-group-vertical" disabled={!values.body.trim() || isSubmitting} style={{ border: 'none' }}>
                <img src={sendButtonImg} alt={t('homePage.sendMessageButton')} width="20" height="20" />
              </button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </FormGroup>
  );
};

export default NewMessage;
