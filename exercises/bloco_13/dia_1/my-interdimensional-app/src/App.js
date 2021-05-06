import './App.css';
import React, { Component }from 'react';

class App extends Component  {
  state = {
    characters: [],
  }
  //maneira numero 1 substituir o fetchCharacters() por componentDidMount()
  fetchCharacters = () => {
    fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {
      this.setState({characters: data.results})
    })
  }
  //componentDidMount (MONTAGEM) dispara uma ou mais ações após o componente ser inserido no DOM (ideal para Requisições)
  componentDidMount() { //maneira numero 2 de fazer 
    this.fetchCharacters();
  }

  render() {
    const { characters } = this.state;
    return (
      <div className="App">
      <h1>
        Ricky and Morty Characters:
      </h1>
      <div className="body">
        {characters.map((character) => {
          return (
            <div className="container" key={character.name}>
              <h3>{character.name}</h3>
              <img src={character.image} alt={character.name}/>
            </div>
           )
          })}
    </div>
    </div>
    );
  }
}

export default App;


//this.setState(
//  (estadoAnterior) => ({ meuEstado: estadoAnterior }), // Primeiro parâmetro!
//  () => { /* ... Sua lógica aqui */ } // Segundo parâmetro!
//)

