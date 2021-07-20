
import React from 'react';
import pokemons from './data';

class App extends React.Component {
  render(){
  return (
    <div>
      <h1>Pokedex</h1>
      {
        pokemons.map((pokemon) => 
          <div key={pokemon.id}>
            <p>{pokemon.name}</p>
            <p>{pokemon.type}</p>
            <p>{`Average weight: ${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`}</p>
            
            <img
               src={pokemon.image}
               alt="pokemon_foto"
            >
            </img>
            
          </div>
        )
      }
    </div>
  );
  }
}

export default App;
