import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import { Navigation } from "./components";
import { Header, LandingPage } from "./layouts";
import GroupsListPage from "./layouts/GroupsListPage";

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
      {isLoaded && <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/test">
          <div>Test</div>
        </Route>
        <Route path="/groups">
          <GroupsListPage />
        </Route>
      </Switch>}
    </>
  );
}

export default App;
