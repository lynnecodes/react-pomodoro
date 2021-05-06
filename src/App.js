import React, { useState, useRef } from 'react';
import './App.css';

{/* want extra zero; convert to string to use padStart; outside of component as helper function; irrelevant to component */}
function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
{/* ------STATE VARIABLES------- */ }

  const [title, setTitle] = useState(`Let's start!`)

  {/* to update number to update render; to decrement each second - 25min x 60  */ }
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  {/* hide buttons */ }
  const [isRunning, setIsRunning] = useState(false);

  {/* create variable to store setInterval; when re-renders, null stops process; useRef to keep data between renders */}
  const intervalRef = useRef(null);

{/* ------FUNCTIONS------- */ }
  {/* start timer; look at previous value & update */ }
  function startTimer() {
  
    {/* prevent from doubling button clicks */ }
    if (intervalRef.current !== null)
      return;
  
    {/* able to chage title on start */ }
    setTitle(`You're awesome!!`);
  
    {/* set button */ }
    setIsRunning(true);
  
    {/* set intervalRef store into .current to work */}
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft >= 1)
          return timeLeft - 1;
        
        {/* reset the timer */ }
        resetTimer();
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    {/* no double stops */}
    if (intervalRef.current == null)
      return;
  
    {/* need to pass interval to clear */}
    clearInterval(intervalRef.current);
  
    {/* need to set for start button to work again */}
    intervalRef.current = null;
  
    {/* able to change the title on stop */ }
    setTitle('Keep going!');

    {/* set button */ }
    setIsRunning(false);
  }

  function resetTimer() {
    {/* need to clear out timer */}
    clearInterval(intervalRef.current);
  
    {/* need to set for start button to work again */}
    intervalRef.current = null;
  
    {/* able to change the title on reset */ }
    setTitle(`Let's go again!`);
  
    {/* set time back to 25min */ }
    setTimeLeft(25 * 60);

    {/* set button */ }
    setIsRunning(false);
  }

{/* ------COMPUTED FOR RENDER------- */ }
  {/* calculate min & sec; math.floor to round; add padTime for extra zero */ }
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {/* Add event listeners; conditionally render each one */}
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
