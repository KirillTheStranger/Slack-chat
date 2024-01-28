import { changeChannel } from '../store/slices/app.js';
import { useSelector, useDispatch } from 'react-redux';
import { changeModalState } from '../store/slices/app.js';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.app);

  return (
    <li className="nav-item w-100">
      {channel.removable ? (
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
            <Dropdown.Item href="#" onClick={() => dispatch(changeModalState({ modalName: 'removeChannel', editChannelId: channel.id }))}>
              Удалить
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => dispatch(changeModalState({ modalName: 'editChannel', editChannelId: channel.id }))}>
              Переименовать
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          variant={`${currentChannel === channel.name ? 'secondary' : ''}`}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => dispatch(changeChannel({ name: channel.name, id: channel.id }))}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </li>
  );
};

export default Channel;
