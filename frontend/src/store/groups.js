import { csrfFetch } from "./csrf";

const LOAD_GROUPS = "groups/loadGroups";
const CREATE_GROUP = "groups/createGroup";
const RECEIVE_GROUP = "groups/receiveGroup";
const UPDATE_GROUP = "groups/updateGroup";
const REMOVE_GROUP = "groups/removeGroup";

export const loadGroups = (groups) => ({
  type: LOAD_GROUPS,
  payload: groups,
});

export const receiveGroup = (group) => ({
  type: RECEIVE_GROUP,
  payload: group,
});

export const createGroupAction = (group) => ({
  type: CREATE_GROUP,
  payload: group,
});

export const removeGroupAction = (groupId) => ({
  type: REMOVE_GROUP,
  payload: groupId,
});

export const updateGroupAction = (groupUpdate) => ({
  type: UPDATE_GROUP,
  payload: groupUpdate,
});

export const getAllGroups = () => async (dispatch) => {
  const response = await csrfFetch("/api/groups");
  const allGroups = await response.json();
  if (response.ok) {
    dispatch(loadGroups(allGroups));
  }
  return allGroups;
};

export const getGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`);
  const group = await response.json();
  if (response.ok) {
    return dispatch(receiveGroup(group));
  }
};

export const createGroupThunk = (group) => async (dispatch) => {
  const { name, about, type, isPrivate, city, state } = group;
  const response = await csrfFetch("/api/groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      about,
      type,
      private: isPrivate,
      city,
      state,
    }),
  });

  const newGroup = await response.json();

  if (response.ok) {
    return await dispatch(createGroupAction(newGroup));
  }
};

export const removeGroupThunk = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeGroupAction(groupId));
  }
};

export const updateGroupThunk = (groupUpdate) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupUpdate.id}`, {
    method: "PUT",
    body: JSON.stringify(groupUpdate),
  });

  const updatedGroup = await response.json();

  if (response.ok) {
    return await dispatch(updateGroupAction(updatedGroup));
  }
};

const groupsReducer = (
  state = {
    allGroups: {},
    currentGroup: {},
  },
  action
) => {
  switch (action.type) {
    case LOAD_GROUPS: {
      const groupState = { ...state, allGroups: {}, currentGroup: {} };
      action.payload.Groups.forEach((group) => {
        groupState.allGroups[group.id] = group;
      });
      return groupState;
    }
    case CREATE_GROUP: {
      const groupState = { ...state, allGroups: state.allGroups, currentGroup: state.currentGroup };
      groupState.allGroups[action.payload.id] = action.payload;
      return groupState;
    }

    case RECEIVE_GROUP: {
      const groupState = { ...state, allGroups: state.allGroups, customElements: {} };
      groupState.currentGroup = action.payload;
      return groupState;
    }

    case REMOVE_GROUP: {
      const groupState = { ...state, allGroups: state.allGroups, currentGroup: state.currentGroup };
      delete groupState.allGroups[action.payload];
      getAllGroups.currentGroup = {}
      return groupState;
    }

    case UPDATE_GROUP: {
      const groupState = { ...state, allGroups: state.allGroups, currentGroup: state.currentGroup };
      Object.assign(groupState.allGroups, {
        [action.payload.id]: action.payload,
      });
      groupState.currentGroup = groupState.allGroups[action.payload.id]
      return groupState;
    }

    default:
      return state;
  }
};

export default groupsReducer;
