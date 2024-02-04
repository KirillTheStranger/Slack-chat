import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { changeModalState } from '../../store/slices/app.js';
import ChannelButton from './channelButton.jsx';

const RemovableChannel = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentChannel } = useSelector((state) => state.app);

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <ChannelButton channel={channel} />

      <Dropdown.Toggle variant={`${currentChannel === channel.name ? 'secondary' : ''}`} className="flex-grow-0 dropdown-toggle-split">
        <span className="visually-hidden">{t('homePage.setupChannel')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={() => dispatch(changeModalState({ isModalOpened: true, modalType: 'removing', editChannelId: channel.id }))}>
          {t('homePage.modals.deleteDropMenu')}
        </Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => dispatch(changeModalState({ isModalOpened: true, modalType: 'renaming', editChannelId: channel.id }))}>
          {t('homePage.modals.renameDropMenu')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RemovableChannel;
