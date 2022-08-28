import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getChatsList, addMessage } from 'redux/chats';

import s from './PersonalChat.module.css';

import { BsCheckCircle } from 'react-icons/bs';
import { MdOutlineSend } from 'react-icons/md';

import { getChuckNorrisRes } from 'redux/Api';

const PersonalChat = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const { id } = useParams();

  const contacts = useSelector(getChatsList);

  const dispatch = useDispatch();

  let myRef = useRef();

  const { avatar, name, isCheck, messages } = contacts.find(el => el.id === id);

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  useEffect(() => {
    if (messages.length !== 0) {
      myRef.current?.scrollIntoView();
    }
  }, [messages]);

  async function fetchChuckNorrisJoke() {
    try {
      const joke = await getChuckNorrisRes();
      const date = new Date();
      dispatch(
        addMessage({
          id: messages.length * 2,
          msgText: joke.value,
          date: date.toLocaleString('en-US', options),
          chatId: id,
        })
      );
    } catch (error) {
      setError(true);
    }
  }

  const onSendMessage = evt => {
    evt.preventDefault();
    const date = new Date();

    dispatch(
      addMessage({
        id:
          messages.length % 2 === 0 ? messages.length + 1 : messages.length + 2,
        msgText: message,
        date: date.toLocaleString('en-US', options),
        chatId: id,
      })
    );

    setTimeout(() => {
      fetchChuckNorrisJoke();
    }, 10000);

    setMessage('');
  };

  const checkStatus = isCheck ? s.isCheck : s.isNotCheck;

  return (
    <>
      {error && alert('Oop! Something went wrong! Try again later!')}
      <div className={s.content}>
        <div className={s.user}>
          <span className={s.avatarWrap}>
            <img
              className={s.avatar}
              src={avatar}
              alt="User avatar"
              width="55"
            />
            <BsCheckCircle size="18px" className={checkStatus} />
          </span>
          <span className={s.name}>{name}</span>
        </div>
        <div className={s.chat}>
          <ul className={s.msgList}>
            {messages.map(message => (
              <li key={message.id} ref={myRef} className={s.msg}>
                {message.id % 2 === 0 && (
                  <img
                    className={s.avatar}
                    src={avatar}
                    alt="User avatar"
                    width="55"
                  />
                )}
                <div
                  className={message.id % 2 !== 0 ? s.msgWrapReq : s.msgWrapRes}
                >
                  <p
                    className={
                      message.id % 2 !== 0 ? s.msgTextReq : s.msgTextRes
                    }
                  >
                    {message.msgText}
                  </p>
                  <p className={message.id % 2 !== 0 ? s.date : s.dateRes}>
                    {message.date}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.msgForm}>
          <form onSubmit={onSendMessage} className={s.form}>
            <input
              className={s.input}
              type="text"
              name="message"
              placeholder="Type your message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
            <button type="submit" className={s.btn}>
              <MdOutlineSend size="24px" className={s.btnIcon} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PersonalChat;
