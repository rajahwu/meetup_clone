import { csrfFetch } from "./csrf";

const LOAD_GROUPS = "groups/loadGroups";
const RECEIVE_GROUP = "groups/receiveGroup";
const UPDATE_GROUP = "groups/updateGroup";
const REMOVE_GROUP = "groups/removeGroup";

export const loadGroups = (groups) => ({
  type: LOAD_GROUPS,
  payload: groups,
});

export const getAllGroups = () => async (dispatch) => {
  const response = await csrfFetch("/api/groups");
  const allGroups = await response.json();
  if (response.ok) {
    dispatch(loadGroups(allGroups));
  }
};

const groupsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_GROUPS: {
      const groupState = {};
      action.payload.Groups.forEach((group) => {
        groupState[group.id] = group;
      });
      return groupState;
    }

    default:
      return state;
  }
};

export default groupsReducer;
