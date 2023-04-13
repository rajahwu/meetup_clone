import { csrfFetch } from "./csrf";

const LOAD_EVENTS = "events/loadEvents";
const RECEIVE_EVENT = "events/receiveEvent";
const RECEIVE_EVENTS = "events/receiveEvents";
const CREATE_EVENT = "events/createEvent";
const UPDATE_EVENT = "events/updateEvent";
const REMOVE_EVENT = "events/removeEvent";

export const loadEvents = (events) => ({
  type: LOAD_EVENTS,
  payload: events,
});

export const createEventAction = (event) => ({
  type: CREATE_EVENT,
  payload: event,
});

export const deleteEventAction = (eventId) => ({
  type: REMOVE_EVENT,
  payload: eventId,
});

export const deleteEventThunk = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteEventAction(eventId));
  }
};

export const getAllEvents = () => async (dispatch) => {
  const response = await csrfFetch("/api/events?page=1&size=500");
  const allEvents = await response.json();
  if (response.ok) {
    dispatch(loadEvents(allEvents));
  }
  return allEvents
};

export const recieveEvent = (event) => ({
  type: RECEIVE_EVENT,
  payload: event,
});

export const getEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`);
  const event = await response.json();
  if (response.ok) {
    return dispatch(recieveEvent(event));
  }
};

const recieveEvents = (events) => ({
  type: RECEIVE_EVENTS,
  payload: events,
});

export const getGroupEvents = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`);
  const events = await response.json();
  if (response.ok) {
    return dispatch(recieveEvents(events));
  }
};

export const createEventThunk = (event) => async (dispatch) => {
  const {
    venueId,
    name,
    type,
    price,
    description,
    startDate,
    endDate,
    capacity,
    imageUrl,
    groupId,
  } = event;

  const response = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
    }),
  });
 
  const newEvent = await response.json();

  if (imageUrl) {
    await csrfFetch(`/api/events/${newEvent.id}/images`, {
      method: "POST",
      body: JSON.stringify({
        url: imageUrl,
        preview: true,
      }),
    });
  }
  if (response.ok) {
    dispatch(createEventAction(newEvent));
    dispatch(getAllEvents())
  }
  return newEvent
};

const eventsReducer = (
  state = {
    allEvents: {},
    currentGroupEvents: {},
    currentEvent: {},
  },
  action
) => {
  switch (action.type) {
    case LOAD_EVENTS: {
      const eventState = {
        ...state,
        allEvents: {},
        currentGroupEvents: {},
        currentEvent: {},
      };
      console.log(action.payload)
      action.payload.Events.forEach((event) => {
        eventState.allEvents[event.id] = event;
      });
      return eventState;
    }
    case RECEIVE_EVENT: {
      const eventState = {
        ...state,
        allEvents: state.allEvents,
        currentEvent: {},
        currentGroupEvents: {},
      };
      eventState.currentEvent = action.payload;
      return eventState;
    }

    case RECEIVE_EVENTS: {
      const eventState = {
        ...state,
        allEvents: state.allEvents,
        currentEvent: state.currentEvent,
        currentGroupEvents: {},
      };
      action.payload.Events.forEach((event) => {
        eventState.currentGroupEvents[event.id] = event;
      });
      return eventState;
    }

    case CREATE_EVENT: {
      const eventState = {
        ...state,
        allEvents: state.allEvents,
        currentEvent: {...action.payload},
        currentGroupEvents: {},
      };
      eventState.allEvents[action.payload.id] = action.payload;
      return eventState;
    }

    case REMOVE_EVENT: {
      const eventState = {
        ...state,
        allEvents: state.allEvents,
        currentEvent: {},
        currentGroupEvents: state.currentGroupEvents,
      };
      delete eventState[action.payload];
      return eventState;
    }

    default:
      return state;
  }
};

export default eventsReducer;
