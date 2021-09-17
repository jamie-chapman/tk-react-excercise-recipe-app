import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";

function App() {
  return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials className=navbar-brand">
            Jamie Chapman
          </a>
          <div className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={"/tutorials"} className="nav-link">
                      Tutorials
                  </Link>
              </li>
              <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                      Add
                  </Link>
              </li>
          </div>
        </nav>

        <div className="container mt-3">
            <Switch>
                <Route exact path={["/", "/tutorial"]} component={TutorialsList} />
                <Route exact path="/add" component={AddTutorial} />
            </Switch>

        </div>
    </div>
  );
}

export default App;
