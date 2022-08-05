import React from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useAppDispatch } from '../hooks';
import { showAlert } from '../store/alertsSlice';
import { setUserToken } from '../store/userSlice';
import {
  blockCheckedUsers,
  deleteCheckedUsers,
  unblockCheckedUsers
} from '../store/usersSlice';

const Toolbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(setUserToken(''));
    dispatch(showAlert({ text: 'Successfully logged out' }));
  }

  const block = () => {
    dispatch(blockCheckedUsers());
  }

  const unblock = () => {
    dispatch(unblockCheckedUsers());
  }

  const deleteUser = () => {
    dispatch(deleteCheckedUsers());
  }

  return (
    <Container className='d-flex justify-content-between p-0 mt-2 mb-1'>
      <ButtonGroup>
        <Button
          variant='warning'
          onClick={() => block()}
        >
          Block
        </Button>
        <Button
          variant='info'
          onClick={() => unblock()}
        >
          Unblock
        </Button>
        <Button
          variant='danger'
          onClick={() => deleteUser()}
        >
          Delete
        </Button>
      </ButtonGroup>
      <Button
        variant='light'
        onClick={() => logout()}
      >
        Logout
      </Button>
    </Container>
  );
}

export default Toolbar;
