import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('workouts')
      .then((data) => {
        if (isMounted) {
          setWorkouts(data);
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
        <h2 className="h4">Workouts</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group list-group-flush">
          {workouts.map((workout) => (
            <li className="list-group-item" key={workout._id || workout.title}>
              <strong>{workout.title}</strong>
              <div className="text-muted">{workout.focus}</div>
              <div className="small">{workout.difficulty} • {workout.durationMinutes} min</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Workouts;
