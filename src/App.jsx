import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout';

const Chat = lazy(() => import('./pages/Chat/Chat'));
const PersonalChat = lazy(() =>
  import('./components/PersonalChat/PersonalChat')
);
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Chat />} />
        <Route path="/personal-chat/:id" element={<PersonalChat />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
