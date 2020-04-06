import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Stocks from "./pages/Stocks";
import Home from "./pages/Home";
import Locations from "./pages/Locations";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const [isMobile, setIsMobile] = useState();

  const [locationList, setLocationList] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkMobile = () => {
    if (window.innerWidth <= 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  window.addEventListener("resize", checkMobile);

  const logOut = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    });
  };

  const getLocations = async () => {
    const response = await fetch("http://localhost:5000/api/locations");
    const jsonResponse = await response.json();
    setLocationList(jsonResponse);
  };

  useEffect(() => {
    getLocations();
    checkMobile();
  }, []);

  return (
    <Router>
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stocks">Stocks</Link>
            </li>
            <li>
              <Link to="/locations">Locations</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <button onClick={logOut}>Logout</button>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/locations">
            <Locations
              locationList={locationList}
              setLocationList={setLocationList}
              getLocations={getLocations}
            />
          </Route>
          <Route path="/stocks">
            <Stocks locationList={locationList} isMobile={isMobile} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </>
    </Router>
  );
};

export default App;
