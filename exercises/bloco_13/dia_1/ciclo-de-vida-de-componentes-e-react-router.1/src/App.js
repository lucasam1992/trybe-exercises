import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    data:"",
    nome:"",
    };
  }

  fetchCaes = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
      this.setState({data:data})
    })
  }

  componentDidMount() {
    this.fetchCaes();
  }

  // shouldComponentUpdate E componentDidUpdate são usados para atualização do componente
  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.data.message.includes("terrier")){
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    localStorage.setItem("caoEnderecoFoto", this.state.data.message);
    const dogBreed = this.state.data.message;
    alert(dogBreed);
  }

 //  salvarCao = () => {
 //   const {
 //     data: {message},
 //     name,
 //   } = this.state;  
//  }

  render() {
    if (this.state.data === "") return "loading...";
    return (
      <div>
        <p>Caes</p>
        <button onClick={this.fetchCaes}>Novo Cachorro!</button>
      <div>
        
        
      </div>
        <button onClick={this.salvarCao}>Salvar</button>
      <div>
          <img src={this.state.data.message} alt="Alê" width="500px" /> 
      </div>
      </div>
    );
  }
}
 
export default App;



/*

<input
  type="text"
  value={this.state.nome}
  onChange={ escrever => this.state({nome: escrever.target.value})}
/>

*/
