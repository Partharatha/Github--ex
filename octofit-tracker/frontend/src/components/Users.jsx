import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('users')
      .then((data) => {
        if (isMounted) {
          setUsers(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Users</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li className="list-group-item" key={user._id || user.email}>
              <strong>{user.name}</strong>
              <div className="text-muted">{user.email}</div>
              <div className="small text-capitalize">Role: {user.role || 'member'}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Users;
