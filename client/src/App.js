import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./app.scss";
//Pages
import Stocks from "./pages/Stocks/Stocks";
import Home from "./pages/Home/Home";
import Locations from "./pages/Locations/Locations";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  //State
  const [isMobile, setIsMobile] = useState();
  const [locationList, setLocationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");

  //Component Functions
  const checkMobile = () => {
    if (window.innerWidth <= 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  const getLocations = async () => {
    await fetch("/api/locations")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLocationList(data);
      });
  };
  const authenticateUser = async () => {
    await fetch("/api/auth/", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        if (data.response) {
          setIsAuthenticated(data.response);
          setEmail(data.email);
          setIsLoading(false);
          return true;
        } else {
          setIsAuthenticated(false);
          setEmail("");
          setIsLoading(false);
          return false;
        }
      });
    });
  };

  //Listeners
  useEffect(() => {
    getLocations();
    checkMobile();
    authenticateUser();
  }, []);

  window.addEventListener("resize", checkMobile);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName="active" to="/home">
              Home
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li>
              <NavLink activeClassName="active" to="/stocks">
                Stocks
              </NavLink>
            </li>
          ) : (
            <></>
          )}
          {isAuthenticated ? (
            <li>
              <NavLink activeClassName="active" to="/locations">
                Locations
              </NavLink>
            </li>
          ) : (
            <></>
          )}
          {!isAuthenticated ? (
            <li>
              <NavLink activeClassName="active" to="/login">
                Login
              </NavLink>
            </li>
          ) : (
            <></>
          )}
          {isAuthenticated ? (
            <li>
              <NavLink activeClassName="active" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="fade">
              <Switch location={location}>
                <Route path="/signup">
                  {isLoading ? (
                    <h1 className="loading">Loading</h1>
                  ) : !isAuthenticated ? (
                    <Signup />
                  ) : (
                    <Redirect to="/home" />
                  )}
                </Route>
                <Route path="/login">
                  {isLoading ? (
                    <h1 className="loading">Loading</h1>
                  ) : !isAuthenticated ? (
                    <Login />
                  ) : (
                    <Redirect to="/home" />
                  )}
                </Route>
                <Route path="/locations">
                  {isLoading ? (
                    <h1 className="loading">Loading</h1>
                  ) : isAuthenticated ? (
                    <Locations
                      locationList={locationList}
                      setLocationList={setLocationList}
                      getLocations={getLocations}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path="/stocks">
                  {isLoading ? (
                    <h1 className="loading">Loading</h1>
                  ) : isAuthenticated ? (
                    <Stocks locationList={locationList} isMobile={isMobile} />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path="/dashboard">
                  {isLoading ? (
                    <h1 className="loading">Loading</h1>
                  ) : isAuthenticated ? (
                    <Dashboard email={email} />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/">
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  );
};

export default App;
