import { useEffect, useState } from 'react';

const SECURITY_CODE = 'qwerty';

export const UseState = ({ name }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setError(false);
      setTimeout(() => {
        if (value !== SECURITY_CODE) setError(true);

        setLoading(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div>
      <h2>Delete {name}</h2>

      <p>Please enter the security code to check that you want to delete.</p>

      {error && <p>Error: the code is not correct❗</p>}

      {loading && <p>Loading...</p>}

      <input
        type="text"
        placeholder="Security Code"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />

      <button onClick={() => setLoading(true)}>Check</button>
    </div>
  );
};
