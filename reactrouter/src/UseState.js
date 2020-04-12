import React, { useState, Fragment, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <h3>Couter Exercise:</h3>
      <CounterExercise startCount={100} incrementAmount={5} />
      <br />
      <h3>Clock exercise:</h3>
      <br />
      <DisplayTime />
      <JokeExercise />
    </div>
  );
}

function CounterExercise(props) {
  const [count, setCount] = useState(
    Number(props.startCount) ? props.startCount : 0
  );
  const incrementAmount = Number(props.incrementAmount)
    ? props.incrementAmount
    : 1;

  function decrement() {
    setCount(count - 1);
  }

  function increment() {
    setCount(count + incrementAmount);
  }

  return (
    <Fragment>
      <p>Count is currently: {count}</p>
      <button onClick={increment}> Increment the count by {incrementAmount}</button>
      <button onClick={decrement}> Decrement the count by 1</button>
    </Fragment>
  );
}

function DisplayTime() {
  const [time, setTime] = useState();

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  });

  return (
    <>
      <p>The current time: {time}</p>
    </>
  );
}

function JokeExercise() {
  const [joke, setJoke] = useState("Placeholder-joke");
  const [secondJoke, setSecondJoke] = useState("Another joke in 10 sec!");

  const getCNJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then(res => res.json())
      .then(data => {
        setJoke(data.value);
      });
  };

  useEffect(() => {
    setInterval(() => {
      let options = {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      };

      fetch("https://icanhazdadjoke.com/", options)
      .then(res => res.json())
      .then(data => {console.log(data.joke);setSecondJoke(data.joke)});
      }, 10000);
      }, []);

  return (
    <>
      <p>Click here for a Chuck Norris Joke:</p>
      <button onClick={getCNJoke}>Fetch!</button>
      <b>{joke}</b>
      <p>Here's the Dadjoke:</p>
      <b>{secondJoke}</b>
    </>
  );
}

export default App;



