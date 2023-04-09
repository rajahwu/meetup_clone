import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import { Navigation } from "./components";
import {
  Header,
  LandingPage,
  EventGroupHeader,
  GroupsListPage,
  EventsListPage,
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
          <Route path="/test">
            <div>Test</div>
          </Route>
          <EventGroupHeader>
            <Route path="/groups">
              <GroupsListPage />
            </Route>
            <Route path="/events">
              <EventsListPage />
            </Route>
          </EventGroupHeader>
        </Switch>
      )}
    </>
  );
}

export default App;
