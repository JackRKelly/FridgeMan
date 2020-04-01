import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ViewStocks from "./pages/ViewStocks";
import Home from "./pages/Home";

const App = () => {
  const [isMobile, setIsMobile] = useState();

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
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stocks">View Stocks</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/stocks">
            <ViewStocks isMobile={isMobile} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
