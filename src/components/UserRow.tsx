import React from 'react';
import { Form } from 'react-bootstrap';
import { useAppDispatch } from '../hooks';
import { toggleIsChecked } from '../store/usersSlice';
import { UserIsChecked } from '../types/user';

const UserRow: React.FC<{
  user: UserIsChecked;
}> = ({ user }) => {
  const dispatch = useAppDispatch();

  return (
    <tr>
      <td>
        <Form.Check
          checked={user.isChecked}
          onChange={() => dispatch(toggleIsChecked(user.id))}
        />
      </td>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.registrationDate}</td>
      <td>{user.lastLoginDate || 'didn\'t login'}</td>
      <td>{user.isBlocked ? 'Yes' : 'No'}</td>
    </tr>
  );
}

export default UserRow;
