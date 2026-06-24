import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('activities')
      .then((data) => {
        if (isMounted) {
          setActivities(data);
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
        <h2 className="h4">Activities</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group list-group-flush">
          {activities.map((activity) => (
            <li className="list-group-item" key={activity._id || activity.date}>
              <strong>{activity.type}</strong>
              <div className="text-muted">{activity.date}</div>
              <div className="small">{activity.durationMinutes} min • {activity.calories} kcal</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Activities;
