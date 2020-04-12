import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import UseState from './UseState';
import FormDemo from './FormDemo';

import "./style2.css";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Header />
       

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}

        <div className="content">
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/useState">
            <UseState  />
            </Route>
            <Route path="/formdemo">
              <FormDemo />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

  function Header() {
    return (
      <ul className="header">
        <li>
          <NavLink exact activeClassName="selected" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="selected" to="/usestate">
            useState exercise
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="selected" to="/formDemo">
            Form demo
          </NavLink>
        </li>
      </ul>
    );
  }

