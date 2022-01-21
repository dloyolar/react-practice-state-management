import { useEffect, useReducer } from 'react';

const SECURITY_CODE = 'qwerty';

export const UseReducer = ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const resetError = () => dispatch({ type: actionTypes.reset_error });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });

  const onWrite = (e) => {
    dispatch({
      type: actionTypes.write,
      payload: e.target.value,
    });
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
          onChange={onWrite}
        />
        <button onClick={onCheck}>Check</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Are you sure you want to remove UseState?</p>
        <button onClick={onDelete}>Yes, Delete</button>
        <button onClick={onReset}>No, I regretted</button>
      </>
    );
  } else {
    return (
      <>
        <p>UseState deleted</p>
        <button onClick={onReset}>Reset State</button>
      </>
    );
  }
};

const initialState = {
  value: '',
  loading: false,
  error: false,
  deleted: false,
  confirmed: false,
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: { ...state, error: true, loading: false },
  [actionTypes.check]: { ...state, loading: true },
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.reset_error]: { ...state, error: false },
  [actionTypes.delete]: { ...state, deleted: true },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: '',
  },
  [actionTypes.write]: { ...state, value: payload },
});

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  check: 'CHECK',
  reset_error: 'RESET_ERROR',
  delete: 'DELETE',
  write: 'WRITE',
  reset: 'RESET',
};

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};
