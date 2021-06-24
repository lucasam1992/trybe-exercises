import React from 'react';
import useTimer from './useTimer';

const App = () => {
  const { timer, randomNumber, isMultiple } = useTimer();

  return (
    <div>
    {timer}
    <br />
    {randomNumber}
    <br />
    {isMultiple ? 'Acerto' : ''}
    </div>
  );
}

export default App;
