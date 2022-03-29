//children = ferramenta para reutilizar componentes

class App extends Component {
    render() {
      return (
        <div className='main'>
          <ComponentePai>
            <p>SUPIMPA</p>
          </ComponentePai>
        </div>
      )
    }
  }

 // imprime na tela o valor SUPIMPA no componente pai
 
 const ComponentePai = (props) => {
    return (
      <div>
        {props.children}
      </div>
    )
  }

 // props.children é um objeto por ser apenas um elemento
 
// Caso o ComponentePai esteja com mais de um elemento dentro como no exemplo abaixo,
// props.children se torna um array de objetos , com as informações de cada filho.

class App extends Component {
    render() {
      return (
        <div className='main'>
          <ComponentePai>
            <p>SUPIMPA</p>
            <h1>BACANA</h1>
            <span>INCRÍVEL</span>
          </ComponentePai>
        </div>
      )
    }
  }