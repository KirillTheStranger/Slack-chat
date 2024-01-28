import { useRemoveChannelMutation } from '../api/HomeChannelsApi.js';
import { changeChannel } from '../store/slices/app.js';
import { changeModalState } from '../store/slices/app.js';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, FormGroup, Button } from 'react-bootstrap';

const RemoveChannelModal = () => {
  const { currentChannelId, editChannelId } = useSelector((state) => state.app);

  const [removeChannel] = useRemoveChannelMutation();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(changeModalState({ modalName: 'removeChannel', editChannelId: null }));
  };

  const handleRenameChannel = async () => {
    await removeChannel({ id: editChannelId });

    if (currentChannelId === editChannelId) {
      dispatch(changeChannel({ name: 'general', id: '1' }));
    }

    handleCloseModal();
  };

  return (
    <Modal show centered onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <FormGroup className="d-flex justify-content-end">
          <Button variant="secondary" type="button" className="me-2" onClick={handleCloseModal}>
            Отменить
          </Button>
          <Button variant="danger" type="submit" onClick={handleRenameChannel}>
            Удалить
          </Button>
        </FormGroup>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
