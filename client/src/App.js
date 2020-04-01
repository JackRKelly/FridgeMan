import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ViewStocks from "./pages/ViewStocks";
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

  useEffect(checkMobile, []);

  return (
    <Router>
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stocks">View Stocks</Link>
            </li>
            <li>
              <Link to="/locations">Locations</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/locations">
            <Locations locationList={locationList} setLocationList={setLocationList}/>
          </Route>
          <Route path="/stocks">
            <ViewStocks locationList={locationList} isMobile={isMobile} />
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
