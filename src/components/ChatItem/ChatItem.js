import s from './ChatItem.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { BsCheckCircle } from 'react-icons/bs';

const ChatItem = ({ id, avatar, name, isCheck, messages }) => {
  const checkStatus = isCheck ? s.isCheck : s.isNotCheck;
  const lastMsg = messages[messages.length - 1];
  const msgDate = new Date(lastMsg && lastMsg.date);

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return (
    <li key={id}>
      <NavLink
        className={({ isActive }) => (isActive ? s.activeItem : s.item)}
        to={`/personal-chat/${id}`}
      >
        <span className={s.avatarWrap}>
          <img className={s.avatar} src={avatar} alt="User avatar" width="55" />
          <BsCheckCircle size="18px" className={checkStatus} />
        </span>
        <div className={s.userData}>
          <p className={s.user}>
            <span className={s.name}>{name}</span>
            {lastMsg && (
              <span className={s.date}>
                {msgDate.toLocaleString('en-US', options)}
              </span>
            )}
          </p>
          {lastMsg && <p className={s.msg}>{lastMsg.msgText}</p>}
        </div>
      </NavLink>
    </li>
  );
};

ChatItem.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  isCheck: PropTypes.bool,
  messages: PropTypes.array,
};

export default ChatItem;
