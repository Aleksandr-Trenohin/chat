import { Link } from 'react-router-dom';

import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <h2 className={s.notFound}>
      Sorry, page not found! Go to{' '}
      <Link to="/" className={s.link}>
        Chats
      </Link>
    </h2>
  );
};

export default NotFoundPage;
