import { csrfFetch } from "./csrf";

const LOAD_EVENTS = "groups/loadEvents";
const RECEIVE_EVENT = "groups/receiveEvent";
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

const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_EVENTS: {
      const eventState = {};
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
