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
//Icons
import Hamburger from "./assets/images/Hamburger";
import CloseMenu from "./assets/images/CloseMenu";

const App = () => {
  //State
  const [isMobile, setIsMobile] = useState();
  const [locationList, setLocationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [navOpen, setNavOpen] = useState("");

  //Component Functions
  const openNavigation = () => {
    setNavOpen(true);
  };
  const closeNavigation = () => {
    setNavOpen(false);
  };
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
      {!isMobile ? (
        <nav className="desktop">
          <ul>
            <div className="left">
              <li>
                <NavLink activeClassName="active" to="/home">
                  Fridge Man
                </NavLink>
              </li>
            </div>
            <div className="right">
              <li>
                <NavLink activeClassName="active" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/signup">
                  Signup
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
            </div>
          </ul>
        </nav>
      ) : (
        <>
          <nav className="mobile">
            <div
              className="circle"
              style={{
                width: navOpen ? "100vw" : "140px",
                height: navOpen ? "100vh" : "140px",
                borderRadius: navOpen ? "0" : "100px",
                top: navOpen ? "0" : "-70px",
                right: navOpen ? "0" : "-70px",
              }}
              onClick={navOpen ? closeNavigation : openNavigation}
            >
              <Hamburger navOpen={navOpen}></Hamburger>
            </div>
          </nav>
          <nav
            className="mobile-full"
            style={{
              transitionDelay: navOpen ? ".2s" : "0s",
              opacity: navOpen ? 1 : 0,
              pointerEvents: navOpen ? "auto" : "none",
            }}
          >
            <ul>
              <li>
                <CloseMenu closeNavigation={closeNavigation} />
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  to="/home"
                  onClick={closeNavigation}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  to="/login"
                  onClick={closeNavigation}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  to="/signup"
                  onClick={closeNavigation}
                >
                  Signup
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  to="/dashboard"
                  onClick={closeNavigation}
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </nav>
        </>
      )}

      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="fade">
              <Switch location={location}>
                <Route path="/signup">
                  {isLoading ? (
                    <div className="loading page">
                      <h1 className="loading">Loading...</h1>
                    </div>
                  ) : !isAuthenticated ? (
                    <Signup />
                  ) : (
                    <Redirect to="/home" />
                  )}
                </Route>
                <Route path="/login">
                  {isLoading ? (
                    <div className="loading page">
                      <h1 className="loading">Loading...</h1>
                    </div>
                  ) : !isAuthenticated ? (
                    <Login />
                  ) : (
                    <Redirect to="/home" />
                  )}
                </Route>
                <Route path="/locations">
                  {isLoading ? (
                    <div className="loading page">
                      <h1 className="loading">Loading...</h1>
                    </div>
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
                    <div className="loading page">
                      <h1 className="loading">Loading...</h1>
                    </div>
                  ) : isAuthenticated ? (
                    <Stocks locationList={locationList} isMobile={isMobile} />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path="/dashboard">
                  {isLoading ? (
                    <div className="loading page">
                      <h1 className="loading">Loading...</h1>
                    </div>
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
