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

// export const receiveGroup = (group) => ({
//   type: RECEIVE_GROUP,
//   payload: group
// })

export const createGroupAction = (group) => ({
  type: CREATE_GROUP,
  payload: group,
});

export const getAllGroups = () => async (dispatch) => {
  const response = await csrfFetch("/api/groups");
  const allGroups = await response.json();
  if (response.ok) {
    dispatch(loadGroups(allGroups));
  }
  return allGroups
};

// export const getGroup = (groupId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/groups/${groupId}`)
//   const group = await response.json()
//     if(response.ok) {
//       dispatch(receiveGroup(group))
//     }
//     return group
// }

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

const groupsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_GROUPS: {
      const groupState = {};
      action.payload.Groups.forEach((group) => {
        groupState[group.id] = group;
      });
      return groupState;
    }
    case CREATE_GROUP: {
      const groupState = { ...state.groups };
      groupState[action.payload.id] = action.payload;
      return groupState;
    }

    default:
      return state;
  }
};

export default groupsReducer;
