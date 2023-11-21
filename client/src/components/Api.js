import React, { useEffect, useState } from 'react';

function Api() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => {
        setBackendData(data.users);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      {backendData.length === 0 ? (
        <p>Loading</p>
      ) : (
        backendData.map((user, i) => (
          <h1 key={i}>{user}</h1>
        ))
      )}
    </div>
  );
}

export default Api;


