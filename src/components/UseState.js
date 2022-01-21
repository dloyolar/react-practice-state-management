import { useEffect, useState } from 'react';

const SECURITY_CODE = 'qwerty';

export const UseState = ({ name }) => {
  const [state, setState] = useState({
    value: '',
    loading: false,
    error: false,
    deleted: false,
    confirmed: false,
  });

  useEffect(() => {
    if (state.loading) {
      setState({ ...state, error: false });
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          setState({ ...state, error: true, loading: false });
        } else {
          setState({ ...state, error: false, loading: false, confirmed: true });
        }
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Delete {name}</h2>
        <p>
          Please enter the security code to check that you want to delete.{' '}
          <strong>Hint: "qwerty"</strong>
        </p>
        {state.error && <p>Error: the code is not correct❗</p>}
        {state.loading && <p>Loading...</p>}
        <input
          type="text"
          placeholder="Security Code"
          value={state.value}
          onChange={(e) => {
            setState({ ...state, value: e.target.value });
          }}
        />
        <button onClick={() => setState({ ...state, loading: true })}>
          Check
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Are you sure you want to remove UseState?</p>
        <button onClick={() => setState({ ...state, deleted: true })}>
          Yes, Delete
        </button>
        <button
          onClick={() => setState({ ...state, confirmed: false, value: '' })}
        >
          No, I regretted
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>UseState deleted</p>
        <button
          onClick={() =>
            setState({ ...state, confirmed: false, deleted: false, value: '' })
          }
        >
          Reset State
        </button>
      </>
    );
  }
};
