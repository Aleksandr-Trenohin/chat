import { useSelector } from 'react-redux';
import s from './ChatList.module.css';

import { getChatsList, getFilterName } from 'redux/chats';

import ChatItem from 'components/ChatItem/ChatItem';

const ChatList = () => {
  const contacts = useSelector(getChatsList);
  const filter = useSelector(getFilterName);

  return (
    <>
      <ul className={s.chatList}>
        {contacts.map(
          contact =>
            contact.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 && (
              <ChatItem
                id={contact.id}
                avatar={contact.avatar}
                name={contact.name}
                isCheck={contact.isCheck}
                messages={contact.messages}
              />
            )
        )}
      </ul>
    </>
  );
};

export default ChatList;
