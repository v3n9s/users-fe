import React, { useState } from 'react';
import { Button, Col, Form, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useAppDispatch } from '../hooks';
import { showAlert } from '../store/alertsSlice';
import { loginUser } from '../services/auth';
import { setUserToken } from '../store/userSlice';

const LoginForm: React.FC<{
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsLogin }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      password: ''
    },
    onSubmit: async (values) => {
      if (!values.name || !values.password) {
        dispatch(showAlert({
          text: 'You must specify name and password',
          variant: 'danger'
        }));
      } else {
        setIsLoading(true);
        const token = await loginUser(values);
        setIsLoading(false);
        if (token) {
          dispatch(showAlert({
            text: 'Successfully logged in',
            variant: 'success'
          }));
          dispatch(setUserToken(token));
        }
      }
    }
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className='mt-1'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          name='name'
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </Form.Group>
      <Form.Group className='mt-1'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </Form.Group>
      <Button
        className='mt-2'
        variant='primary'
        type='submit'
        disabled={isLoading}
      >
        {
          isLoading
          && <Spinner animation='border' size='sm' className='me-1' />
        }
        Login
      </Button>
      <Col className='d-flex justify-content-center align-items-center'>
        <Form.Text className='mb-1'>
          Don't have an account ?
        </Form.Text>
        <Button
          variant='link'
          disabled={isLoading}
          onClick={() => setIsLogin(false)}
        >
          Register
        </Button>
      </Col>
    </Form>
  );
}

export default LoginForm;
