import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useAddChannelMutation } from '../../api/homeChannelsApi.js';
import { changeChannel } from '../../store/slices/app.js';

const AddChannel = ({ handleCloseModal }) => {
  const { channelNames } = useSelector((state) => state.app);
  const { t } = useTranslation();

  const channelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('homePage.modals.errors.shortChannelName'))
      .max(20, t('homePage.modals.errors.longChannelName'))
      .matches(/\S/, t('homePage.modals.errors.requiredField'))
      .required(t('homePage.modals.errors.requiredField'))
      .notOneOf(channelNames, t('homePage.modals.errors.uniqueName')),
  });

  const [addChannel] = useAddChannelMutation();
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddNewChannel = async (channelName) => {
    const filteredChannelName = filter.clean(channelName);
    const newChannel = { name: filteredChannelName };
    const { data: { name, id } } = await addChannel(newChannel);

    toast.success(t('homePage.notifications.success.addChannel'), {
      position: 'top-right',
      autoClose: 2000,
    });

    handleCloseModal();
    dispatch(changeChannel({ name, id }));
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={({ name }) => handleAddNewChannel(name)}
      validationSchema={channelSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        errors, values, handleSubmit, handleChange, isSubmitting,
      }) => (
        <Modal show centered onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{t('homePage.modals.addNewChannelHeader')}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={handleSubmit} disabled>
              <FormGroup>
                <FormControl name="name" id="name" className="mb-2" value={values.name} onChange={handleChange} isInvalid={!!errors.name} ref={inputRef} />
                <label htmlFor="name" className="visually-hidden">
                  {t('homePage.modals.newChannelName')}
                </label>
                <FormGroup className="invalid-feedback">{errors.name}</FormGroup>
                <FormGroup className="d-flex justify-content-end">
                  <Button variant="secondary" type="button" className="me-2" onClick={handleCloseModal}>
                    {t('homePage.modals.declineButton')}
                  </Button>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {t('homePage.modals.confirmButton')}
                  </Button>
                </FormGroup>
              </FormGroup>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default AddChannel;
