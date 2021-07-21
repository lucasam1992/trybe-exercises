import './App.css';
import React from 'react';

class App extends React.Component {
  handleClick(){
    console.log('clicou');
  }
  
  render(){
  return (
    <button onClick={this.handleClick}>Meu botão</button>,
    <button onClick={this.handleClick}>Meu botão 2</button>,
    <button onClick={this.handleClick}>Meu botão 3</button>
  );
  }
}

export default App;
