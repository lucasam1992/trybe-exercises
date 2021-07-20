//component Greeting
// props são como os parametros de uma função
import React from 'react';

class Greeting extends React.Component {
    render(){
        return <h1>Hello, {this.props.name} {this.props.lastName}</h1>;
    }
}

export default Greeting;

//Chama-se a função Greeting dentro do componente App

import Greeting from './Greeting';

function App(){
    return (
        <main>
            <Greeting name="Samuel" lastName="Silva" />
        </main>
    );
}

export default App;


//Composição de Componentes
//A ideia do React é aproveitamento de código, logo é feito composição de componentes

//Exemplo de aula

//Dentro do App.js temos 2 objetos albuns

import React from 'react';

class App extends React.Component {
    render() {
        const album01 ={ 
            image: ...
            ...
        }
        const album02 ={ 
            image: ...
            ...
        }
    
    return(
        <article>
        <section>
          <img src={ album01.image } alt={ album01.title } />
          <h2>{ album01.title }</h2>
          <p>Lançamento: { album01.releaseDate.year }</p>
          <p>Gravadora: { album01.others.recordCompany }</p>
          <p>Formatos: { album01.others.formats }</p>
        </section>
        <section>
          <img src={ album02.image } alt={ album02.title } />
          <h2>{ album02.title }</h2>
          <p>Lançamento: { album02.releaseDate.year }</p>
          <p>Gravadora: { album02.others.recordCompany }</p>
          <p>Formatos: { album02.others.formats }</p>
        </section>
      </article>
    );
    }
}

export default App;

//A partir do código acima, será feita a refatoração do código para que ele não se torne extenso
//e fique reaproveitavel, ou seja, será criado os componantes que poderão ser usados mais de uma 
//oportunidade
//sera escolhido a tag <section> para refatorar, pois assim poderá ser usada diversas vezes

//cria-se um novo arquivo 

import React from 'react';

class Album extends React.Component {
    render(){
        <section>
        <img src={this.props.album.image} alt={this.props.album.title} />
        <h2>{this.props.album.title}</h2>
        <p>this.props.album.releaseDate.year</p>
        <p>
          Lançamento:
          { `${ this.props.album.releaseDate.day }/${ this.props.album.releaseDate.month }/${ this.props.album.releaseDate.year }` }
         </p>
         <p>Gravadora: { this.props.album.others.recordCompany }</p>
         <p>Formatos: { this.props.album.others.formats }</p>

        </section>
    }
}

export default Album;

//Sera feita a refatoração de App.js. Para trocar as tags <section> pelo componente Album criado acima

import React from 'react';
import Album from './complements/Album'

class App extends React.Component {
    render() {
        const album01 ={ 
            image: ...
            ...
        }
        const album02 ={ 
            image: ...
            ...
        }

        return (
            <article>
                <Album album={album01} />
                <Album album={album02} />
            </article>
        );
    }
}

//App.js contem dois componentes Album


//NOVO EXEMPLO-------------------------------------------------------------------------------
import React from 'react';

class Image extends React.Component{
    render(){
        return <img src={this.props.source} alt={this.props.alternativeText} />;
    }
}

export default Image;

// Criação do arquivo UserProfile.js que vai conter o componente Image

import React from 'react';
import Image from './Image';

class UserProfile extends React.Component {
    render(){
        return (
            <div>
                <p>{this.props.user.name}</p>
                <p>{this.props.user.email}</p>
                <Image source={this.props.user.avatar} alternativeText="User avatar" />
            </div>
        );
    }
}

export default UserProfile;

//App.js chamando os dois ultimos componentes

// arquivo App.js, criado pelo create-react-app, modificado
import React from 'react';
import './App.css';
import UserProfile from './UserProfile';

class App extends React.Component {
  render() {
    const joao = {
      id: 102,
      name: "João",
      email: "joao@gmail.com",
      avatar: "https:\/\/cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_640.png"
    };

    const amelia = {
      id: 77,
      name: "Amélia",
      email: "amelia@gmail.com",
      avatar: "https:\/\/cdn.pixabay.com/photo/2017/01/31/13/05/cameo-2023867_640.png"
    };

    return (
      <div className="App">
        <UserProfile user={joao} />
        <UserProfile user={amelia} />
      </div>
    );
  }
}

export default App;

