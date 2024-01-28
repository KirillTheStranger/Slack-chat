import { useAddChannelMutation } from '../../api/HomeChannelsApi.js';
import { changeModalState, changeChannel } from '../../store/slices/app.js';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap';

const AddChannelModal = () => {
  const { channelNames } = useSelector((state) => state.app);

  const channelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .matches(/\S/, 'Обязательное поле')
      .required('Обязательное поле')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });

  const [addChannel] = useAddChannelMutation();
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCloseModal = () => {
    dispatch(changeModalState({ modalName: 'addChannel' }));
  };

  const handleAddNewChannel = async (channelName) => {
    const newChannel = { name: channelName };
    const response = await addChannel(newChannel);
    const { name, id } = response.data;

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
      {({ errors, values, handleSubmit, handleChange }) => (
        <Modal show centered onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить канал</Modal.Title>
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

export default AddChannelModal;
