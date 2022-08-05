import React, { useEffect } from 'react';
import { Form, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers, toggleAllIsChecked } from '../store/usersSlice';
import Toolbar from './Toolbar';
import UserRow from './UserRow';

const UsersTable: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const users = useAppSelector((state) => state.users);
  const isAllChecked = useAppSelector((state) => state.users.every(({ isChecked }) => isChecked));

  return (
    <>
      <Toolbar />
      <Table>
        <thead>
          <tr>
            <th>
              <Form.Check
                checked={isAllChecked}
                onChange={() => dispatch(toggleAllIsChecked(!isAllChecked))}
              />
            </th>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>Registration date</th>
            <th>Last login date</th>
            <th>Is blocked</th>
          </tr>
        </thead>
        <tbody>
          {
            !!users.length && users.map((user) => (
              <UserRow user={user} key={user.id} />
            ))
          }
        </tbody>
      </Table>
    </>
  );
}

export default UsersTable;
