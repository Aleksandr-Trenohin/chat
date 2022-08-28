import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { filterList } from 'redux/chats';

import s from './SharedLayout.module.css';

import Loader from '../Loader/Loader';
import ChatList from 'components/ChatList/ChatList';

import { ImUser } from 'react-icons/im';
import { BsCheckCircle } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';

const SharedLayout = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  dispatch(filterList(filter));

  return (
    <div className={s.container}>
      <aside className={s.sideBar}>
        <header className={s.headerBar}>
          <div className={s.user}>
            <span className={s.userWrap}>
              <ImUser size="55px" className={s.userIcon} />
              <BsCheckCircle size="18px" className={s.userCheck} />{' '}
            </span>
          </div>
          <div className={s.searchInput}>
            <input
              className={s.input}
              type="text"
              name="filter"
              placeholder="Search or start new chat"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <span className={s.searchIcon}>
              <AiOutlineSearch size="16px" />
            </span>
          </div>
        </header>
        <div className={s.chats}>
          <h2 className={s.title}>Chats</h2>
          <ChatList />
        </div>
      </aside>
      <div className={s.chat}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default SharedLayout;
