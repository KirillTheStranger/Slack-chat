import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useEditChannelMutation } from '../api/HomeChannelsApi.js';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { changeModalState } from '../store/slices/app.js';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap';

const EditChannelModal = () => {
  const { channelNames, editChannelId } = useSelector((state) => state.app);
  console.log(editChannelId);

  const channelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .matches(/\S/, 'Обязательное поле')
      .required('Обязательное поле')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });

  const [editChannel] = useEditChannelMutation();
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCloseModal = () => {
    dispatch(changeModalState({ modalName: 'editChannel', editChannelId: null }));
  };

  const handleRenameChannel = async (channelName) => {
    const id = editChannelId;
    const newChannel = { name: channelName };
    const response = await editChannel(id, newChannel);
    console.log(response);
    handleCloseModal();
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={({ name }) => handleRenameChannel(name)}
      validationSchema={channelSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, values, handleSubmit, handleChange }) => (
        <Modal show centered onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Переименовать канал</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormControl
                  name="name"
                  id="name"
                  className="mb-2"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  autoFocus
                  ref={inputRef}
                />
                <label htmlFor="name" className="visually-hidden">
                  Имя канала
                </label>
                <FormGroup className="invalid-feedback">{errors.name}</FormGroup>
                <FormGroup className="d-flex justify-content-end">
                  <Button variant="secondary" type="button" className="me-2" onClick={handleCloseModal}>
                    Отменить
                  </Button>
                  <Button variant="primary" type="submit">
                    Отправить
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

export default EditChannelModal;