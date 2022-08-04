import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Col, Form, Spinner } from 'react-bootstrap';
import { useAppDispatch } from '../hooks';
import { showAlert } from '../store/alertsSlice';
import { registerUser } from '../services/auth';

const RegistrationForm: React.FC<{
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsLogin }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      repeatedPassword: ''
    },
    onSubmit: async (values) => {
      if (Object.values(values).some((v) => v === '')) {
        dispatch(showAlert({
          text: 'You must specify all fields',
          variant: 'danger'
        }));
      } else if (values.password !== values.repeatedPassword) {
        dispatch(showAlert({
          text: 'Passwords must match',
          variant: 'danger'
        }));
      } else {
        setIsLoading(true);
        const isRegistered = await registerUser({
          email: values.email,
          name: values.name,
          password: values.password
        });
        setIsLoading(false);
        if (isRegistered) {
          dispatch(showAlert({
            text: 'Successfully registered an user',
            variant: 'success'
          }));
          setIsLogin(true);
        }
      }
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className='mt-1'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='text'
          name='email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Form.Group>
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
      <Form.Group className='mt-1'>
        <Form.Label>Repeat password</Form.Label>
        <Form.Control
          type='password'
          name='repeatedPassword'
          onChange={formik.handleChange}
          value={formik.values.repeatedPassword}
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
        Register
      </Button>
      <Col className='d-flex justify-content-center align-items-center'>
        <Form.Text className='mb-1'>
          Don't have an account ?
        </Form.Text>
        <Button
          variant='link'
          disabled={isLoading}
          onClick={() => setIsLogin(true)}
        >
          Login
        </Button>
      </Col>
    </Form>
  );
}

export default RegistrationForm;
