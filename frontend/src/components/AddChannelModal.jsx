import { Formik, Field } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useAddChannelMutation } from '../api/HomeChannelsApi.js';
import { changeModalState, changeChannel } from '../store/slices/app.js';

const AddChannelModal = () => {
  const channelSchema = Yup.object().shape({
    name: Yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').matches(/\S/, 'Обязательное поле').required('Обязательное поле'),
  });

  const [addChannel] = useAddChannelMutation();

  const dispatch = useDispatch();

  const handleAddNewChannel = async (channelName) => {
    const newChannel = { name: channelName };
    const response = await addChannel(newChannel);
    const { name, id } = response.data;

    dispatch(changeModalState('addChannel'));
    dispatch(changeChannel({ name, id }));
  };

  const handleCloseModal = () => {
    dispatch(changeModalState('addChannel'));
  };

  return (
    <>
      <div className="fade modal-backdrop show"></div>
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex={-1} style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">Добавить канал</div>
              <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{ name: '' }}
                onSubmit={({ name }) => handleAddNewChannel(name)}
                validationSchema={channelSchema}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ errors, values, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <Field name="name" id="name" className={`mb-2 form-control ${errors.name ? 'is-invalid' : ''}`} value={values.name} />
                      <label htmlFor="name" className="visually-hidden"></label>
                      <div className="invalid-feedback">{errors.name}</div>
                      <div className="d-flex justify-content-end">
                        <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseModal}>
                          Отменить
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Отправить
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddChannelModal;
