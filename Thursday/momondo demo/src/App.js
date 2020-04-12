import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  NavLink,
  Prompt,
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import "./index.css";

function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = status => {
    setIsLoggedIn(status);
    history.push("/");
  };
  return (
    <div>
    <Header loginMsg={isLoggedIn ? "Logout" : "Login"} isLoggedIn={isLoggedIn} />
    <hr />
    <div className="content">
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/jokes">
        <FetchJokes />
        </Route>
        <Route path="/scrape">
        <Scrape />
        </Route>
        <Route path="login-out">
          <Login loginMsg={isLoggedIn ? "Logout" : "Login"} isLoggedIn={isLoggedIn} setLoginStatus={setLoginStatus}/>
        </Route>
      </Switch>
    </div>
  </div>
  )
}

function Login({isLoggedIn, loginMsg, setLoginStatus}) {
  const handleBtnClick = () => {
    setLoginStatus(!isLoggedIn);
  }

  return (
    <>
      <h2>{loginMsg}</h2>
      <button onClick={handleBtnClick}>{loginMsg}</button>
    </>
  )
}

function Header({ isLoggedIn, loginMsg}) {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <React.Fragtment>       
        <li>
          <NavLink activeClassName="active" to="/jokes">
            Jokes
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/scrape">
            Scrape
          </NavLink>
        </li>

        </React.Fragtment>
        )}
                <li>
          <NavLink activeClassName="active" to="/login-out">
            {loginMsg}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}



function FetchJokes() {
  
  const [joke, setJoke] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/securitystarter/api/jokes")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setJoke(data);
      });
  },[]);

  return (
    <div>
    <p>2 x fetched jokes below:</p>
    <p>Joke 1: {joke.joke1}</p>
    <p>Joke 1 reference: {joke.joke1reference}</p>
    <p>Joke 2: {joke.joke2}</p>
    <p>Joke 2 reference: {joke.joke2reference}</p>
    </div>
  );
}

function Scrape(){

  const [scrape, setScrape] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/securitystarter/api/scrape")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setScrape(data);
    },);
  },[]);

  return (
    <div>
       <h1>Scrapes</h1>
       {scrape.map(scrape => (
         <div>
           <p>URL: {scrape.url}</p>
           <p>Title: {scrape.title}</p>
           <p>DivCount: {scrape.divCount}</p>
           <p>BodyCount: {scrape.bodyCount}</p>
           </div>
         
         ))}
    </div>
  )

}

export default App;
