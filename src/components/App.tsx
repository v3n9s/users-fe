import React from 'react';
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../hooks';
import { isLoggedInSelector } from '../store/userSlice';
import Alerts from './Alerts';
import AuthForm from './AuthForm';
import UsersTable from './UsersTable';

const App: React.FC = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  return (
    <Container>
      <Alerts />
      {isLoggedIn ? <UsersTable /> : <AuthForm />}
    </Container>
  );
}

export default App;
