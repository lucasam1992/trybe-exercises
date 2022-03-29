import React from 'react';
import './App.css';

const tasks = ["Acordar", "Tomar banho", "Comer", "Ler", "Estudar na Trybe"];

const task = () => {
  return (
    <ul className = 'App-header App-link'>{tasks.map(tarefa => <li>{tarefa}</li>)}</ul>
  );
}


export default task;
