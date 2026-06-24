import { useEffect, useState } from "react";

export default function Users() {
  const [data, setData] = useState([]);

  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? "https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/"
    : "http://localhost:8000/api/users/";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
        } else if (Array.isArray(data.items)) {
          setData(data.items);
        } else {
          setData([]);
        }
      });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
