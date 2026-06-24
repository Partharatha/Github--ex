import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('leaderboard')
      .then((data) => {
        if (isMounted) {
          setEntries(data);
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
        <h2 className="h4">Leaderboard</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group list-group-flush">
          {entries.map((entry) => (
            <li className="list-group-item" key={entry._id || entry.rank}>
              <strong>#{entry.rank || 0}</strong> {entry.user?.name || entry.user || 'Unknown'}
              <div className="small">{entry.points} points</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
