import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('teams')
      .then((data) => {
        if (isMounted) {
          setTeams(data);
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
        <h2 className="h4">Teams</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group list-group-flush">
          {teams.map((team) => (
            <li className="list-group-item" key={team._id || team.name}>
              <strong>{team.name}</strong>
              <div className="text-muted">{team.sport || 'Fitness'}</div>
              <div className="small">Members: {team.members?.length || 0}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Teams;
