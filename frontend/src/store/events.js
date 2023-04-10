import { csrfFetch } from "./csrf";

const LOAD_EVENTS = "groups/loadEvents";
const RECEIVE_EVENT = "groups/receiveEvent";
const RECEIVE_EVENTS = "groups/receiveEvents";
const UPDATE_EVENT = "groups/updateEvent";
const REMOVE_EVENT = "groups/removeEvent";

export const loadEvents = (events) => ({
  type: LOAD_EVENTS,
  payload: events,
});

export const getAllEvents = () => async (dispatch) => {
  const response = await csrfFetch("/api/events");
  const allEvents = await response.json();
  if (response.ok) {
    dispatch(loadEvents(allEvents));
  }
};

// export const recieveGroupEvents = (events) => ({
//   type: RECEIVE_EVENTS,
//   payload: events

// })

export const getGroupEvents = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`)
  const events = await response.json()
  if (response.ok) {
    return dispatch(loadEvents(events))
  }
}

const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_EVENTS: {
      const eventState = { ...state };
      action.payload.Events.forEach((event) => {
        eventState[event.id] = event;
      });
      return eventState;
    }
   
    default:
      return state;
  }
};

export default eventsReducer;
