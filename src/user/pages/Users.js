import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/Components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/Components/UIElement/LoadingSpinner';
import { useHttpClient } from '../../shared/Hooks/http-hook';

const Users = () => {
  /* const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(); */
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadUsers, setLoadUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users'
        );
        setLoadUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadUsers && <UsersList item={loadUsers} />};
    </React.Fragment>
  );
};

export default Users;
