import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container className='border rounded mt-2' style={{maxWidth: 425}}>
      { isLogin ? <LoginForm /> : <RegistrationForm /> }
    </Container>
  );
}

export default AuthForm;
