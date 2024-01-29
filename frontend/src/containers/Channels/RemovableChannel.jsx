import { changeChannel } from '../../store/slices/app.js';
import { changeModalState } from '../../store/slices/app.js';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const RemovableChannel = ({ channel }) => {
  const dispatch = useDispatch();

  const { currentChannel } = useSelector((state) => state.app);

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        variant={`${currentChannel === channel.name ? 'secondary' : ''}`}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={() => dispatch(changeChannel({ name: channel.name, id: channel.id }))}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>

      <Dropdown.Toggle variant={`${currentChannel === channel.name ? 'secondary' : ''}`} className="flex-grow-0 dropdown-toggle-split" />

      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={() => dispatch(changeModalState({ isModalOpened: true, modalType: 'removing', editChannelId: channel.id }))}>
          Удалить
        </Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => dispatch(changeModalState({ isModalOpened: true, modalType: 'renaming', editChannelId: channel.id }))}>
          Переименовать
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RemovableChannel;
