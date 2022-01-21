import { useEffect, useReducer } from 'react';

const SECURITY_CODE = 'qwerty';

export const UseReducer = ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.loading) {
      dispatch({
        type: 'RESET_ERROR',
      });
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          dispatch({
            type: 'ERROR',
          });
        } else {
          dispatch({
            type: 'CONFIRM',
          });
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
          onChange={(e) =>
            dispatch({
              type: 'WRITE',
              payload: e.target.value,
            })
          }
        />
        <button
          onClick={() =>
            dispatch({
              type: 'CHECK',
            })
          }
        >
          Check
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Are you sure you want to remove UseState?</p>
        <button
          onClick={() =>
            dispatch({
              type: 'DELETE',
            })
          }
        >
          Yes, Delete
        </button>
        <button
          onClick={() =>
            dispatch({
              type: 'RESET',
            })
          }
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
            dispatch({
              type: 'RESET',
            })
          }
        >
          Reset State
        </button>
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
  ERROR: { ...state, error: true, loading: false },
  CHECK: { ...state, loading: true },
  CONFIRM: { ...state, error: false, loading: false, confirmed: true },
  RESET_ERROR: { ...state, error: false },
  DELETE: { ...state, deleted: true },
  RESET: { ...state, confirmed: false, deleted: false, value: '' },
  WRITE: { ...state, value: payload },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};
