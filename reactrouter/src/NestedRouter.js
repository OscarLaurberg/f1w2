import React from "react";
import "./style2.css";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";

export default function NestingExample({info}) {
    //const {info} = props;
    
  return (
    <Router>
      <div>
        <ul className="header">
          <li>
            <NavLink activeClassName="selected" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to="/topics">Topics</NavLink>
          </li>
        </ul>

        <hr />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/topics">
              <Topics info={info}/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Topics({info}) {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  const listItems = info.map(info => {return (
    <li key={info.id}>
        <NavLink to={`${url}/${info.id}`}>{info.title}</NavLink>
    </li>
  )

  });

  return (
    <div>
      <h2>Topics</h2>
      <p>Size {info.length}</p>
      <ul>
        {listItems}
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic info={info}/>
        </Route>
      </Switch>
    </div>
  );
}

function Topic(props) {
  const {info} = props;
  let { topicId } = useParams();
  const topic = info.find((topic) => topicId === topic.id)
  

  return (
    <div>
      <h3>{topicId}</h3>
      <h3> Title</h3>
      {topic.title}
        <h3> Info</h3>
      {topic.info}
      
      </div>
  );
}
