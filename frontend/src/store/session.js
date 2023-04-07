import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const login = (user) => async (dispatch) => {

  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    }
    case REMOVE_USER: {
      const newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    }
    default:
      return state;
  }
};

export default sessionReducer;