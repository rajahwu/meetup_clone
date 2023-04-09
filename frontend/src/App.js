import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import { Navigation } from "./components";
import {
  Header,
  LandingPage,
  EventGroupHeader,
  GroupsListPage,
  EventsListPage,
  CreateGroupPage,
} from "./layouts";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

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
          <EventGroupHeader>
            <Route path="/groups">
              <GroupsListPage />
            </Route>
            <Route path="/events">
              <EventsListPage />
            </Route>
          </EventGroupHeader>
          <Route exact path="/groups/new">
            <CreateGroupPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
