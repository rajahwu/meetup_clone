import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import { Navigation } from "./components";
import { Header } from "./layouts";

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
      {isLoaded && <Switch></Switch>}
    </>
  );
}

export default App;
