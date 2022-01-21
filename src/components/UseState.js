import { useEffect, useState } from 'react';

export const UseState = ({ name }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  return (
    <div>
      <h2>Delete {name}</h2>

      <p>Please enter the security code to check that you want to delete.</p>

      {error && <p>Error: the code is not correct❗</p>}

      {loading && <p>Loading...</p>}

      <input type="text" placeholder="Security Code" />

      <button onClick={() => setLoading(true)}>Check</button>
    </div>
  );
};
