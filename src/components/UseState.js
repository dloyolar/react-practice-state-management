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

  const onConfirm = () => {
    setState({ ...state, error: false, loading: false, confirmed: true });
  };

  const onError = () => {
    setState({ ...state, error: true, loading: false });
  };

  const resetError = () => {
    setState({ ...state, error: false });
  };

  const onCheck = () => {
    setState({ ...state, loading: true });
  };

  const onDelete = () => {
    setState({ ...state, deleted: true });
  };

  const onWrite = (e) => {
    setState({ ...state, value: e.target.value });
  };

  const onReset = () => {
    setState({ ...state, confirmed: false, deleted: false, value: '' });
  };

  useEffect(() => {
    if (state.loading) {
      resetError();
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
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
          onChange={(e) => onWrite(e)}
        />
        <button onClick={() => onCheck()}>Check</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Are you sure you want to remove UseState?</p>
        <button onClick={() => onDelete()}>Yes, Delete</button>
        <button onClick={() => onReset()}>No, I regretted</button>
      </>
    );
  } else {
    return (
      <>
        <p>UseState deleted</p>
        <button onClick={() => onReset()}>Reset State</button>
      </>
    );
  }
};
