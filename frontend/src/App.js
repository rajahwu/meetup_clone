import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import { Navigation } from "./components";
import { Header, EventGroupHeader } from "./layouts";

import {
  LandingPage,
  GroupsListPage,
  CreateGroupPage,
  GroupDetailsPage,
  EventsListPage,
  CreateEventPage,
  PageNotFound,
} from "./pages";

import * as sessionActions from "./store/session";
import EventDetailsPage from "./pages/EventDetailsPage";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const inEventGroup = () =>
    location.pathname === "/events" || location.pathname === "/groups";

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Header>
        <Navigation isLoaded={isLoaded} />
      </Header>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/groups/update/:groupId">
            <CreateGroupPage />
          </Route>

          <Route exact path="/groups/new">
            <CreateGroupPage />
          </Route>

          <Route exact path={"/groups/:groupId/events/new"}>
            <CreateEventPage />
          </Route>

          <Route exact path="/groups/:groupId">
            <GroupDetailsPage />
          </Route>

          <Route exact path="/events/:eventId">
            <EventDetailsPage />
          </Route>

          {inEventGroup() && (
            <EventGroupHeader>
              <Route exact path="/events">
                <EventsListPage />
              </Route>
              <Route exact path="/groups">
                <GroupsListPage />
              </Route>
            </EventGroupHeader>
          )}

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
