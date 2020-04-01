import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Stocks from "./pages/Stocks";
import Home from "./pages/Home";
import Locations from "./pages/Locations";

const App = () => {
  const [isMobile, setIsMobile] = useState();

  const [locationList, setLocationList] = useState([]);

  const checkMobile = () => {
    if (window.innerWidth <= 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  window.addEventListener("resize", checkMobile);

  const getLocations = async () => {
    try {
      const response = await fetch("http://localhost:5000/locations");
      const jsonResponse = await response.json();
      setLocationList(jsonResponse);
    } catch (err) {
      console.error(err.message);
    }
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
          </ul>
        </nav>

        <Switch>
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
