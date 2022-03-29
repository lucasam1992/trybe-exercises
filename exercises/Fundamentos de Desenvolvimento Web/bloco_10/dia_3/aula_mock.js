//Mocks - Mockar uma função é ter controle sobre todo o fundamento de seus testes

//jest.fn();
//jest.mock();
//jest.spyOn();

//jest.fn() = essa função transforma uma função em simulação = Ao mockar uma função com jest.fn() e chama-la, 
//o comportamento definido no mock será chamado, em vez da função original

function randomRgbColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
module.exports = {randomRgbColor};

//fazendo teste da função
const service = require('./service');

test("#randomRgbColor", () =>{
    service.randomRgbColor();
    expect(service.randomRgbColor).toHaveBeenCalled();
});// Não passa pois a função não foi simulada ("mockada")

//-------------------------------------------------
const service = require('./service');

test("#randomRgbColor", () =>{
    service.randomRgbColor = jest.fn(); 
    service.randomRgbColor();
    expect(service.randomRgbColor).toHaveBeenCalled();
});

// mockReturnValue(valor) e mockReturnValueOnce(valor) = definem valores de retorno 

const service = require('./service');

test("#randomRgbColor", () =>{
    service.randomRgbColor = jest.fn().mockReturnValue("rgb(255, 255, 255)");//testando se a função foi chamada e qual
//seu retorno
    service.randomRgbColor();
    expect(service.randomRgbColor).toHaveBeenCalled();
    expect(service.randomRgbColor()).toBe("rgb(255, 255, 255)");
});

// toHaveBennCalled() espera que a função dentro do expect tenha sido executada por alguma chamada anterior 
//a essa linha dentro do contexto do teste

//toHaveBeenCalledTimes(numero) = testa o numero de vezes que a função foi chamada 

const service = require('./service');

test("#randomRgbColor", () =>{
    service.randomRgbColor = jest
        .fn()
        .mockReturnValue('default value')
        .mockReturnValueOnce('first call')
        .mockReturnValueOnce('second call');
    
    expect(service.randomRgbColor).toHaveBeenCalledTimes(0);

    expect(service.randomRgbColor()).toBe("first call");
    expect(service.randomRgbColor).toHaveBeenCalledTimes(1);

    expect(service.randomRgbColor()).toBe("second call");
    expect(service.randomRgbColor).toHaveBeenCalledTimes(2);

    expect(service.randomRgbColor()).toBe("default value");
    expect(service.randomRgbColor).toHaveBeenCalledTimes(3);
});

//Mockando Módulos
//jest.mock() = mocka todo pacote de dependencias ou modulos de uma vez

//Exemplo: arquivo math.js 

const sleep =(ms) =>{
    return new Promise(resolve => setTimeout(resolve,ms));
};
const somar = async (a,b) => {await sleep(10000); return a + b}; 
const subtrair = (a,b) => a - b;
const multiplicar = (a,b) => a * b;
const dividir = (a,b) = a / b;

module.exports = {somar, subtrair, multiplicar, dividir};

// Não se usa jest.fn() pq teria que fazer varios jest.fn() conforme o numero de funções do arquivo
//Para esse tipo de caso usa-se o jest.mock() pq vai pegar todas as funções do arquivo
// ex: jest.mock('./math);

//metodo mockImplementaition(func)  = permite que se usa uma função como implementação
//No caso abaixo, testa a função chamada, numero de vezes, se foi chamada entre outras coisas ...

const math = require('./math');
jest.mock("./math");

test("#somar", () => {
    math.somar.mockImplementation((a,b) => a + b);
    math.somar(1,2);

    expect(math.somar).toHaveBeenCalled(); //verifica se função foi chamada
    expect(math.somar).toHaveBeenCalledTimes(1); //quantas vezes foi chamada
    expect(math.somar).toHaveBeenCalledWith(1,2);// chamada com dados especificos
    expect(math.somar(1,2)).toBe(3);

});

//jest.spyOn() =  função simulada semelhante a jest.fn mas tbm rastreia chamadas para object[methodName].
//Retorna uma função simulada jest

const math = require('.math');

test("#somar", () =>{
    const mockSomar = jest.spyOn(math, "somar");

    mockSomar(1,2);
    expect(mockSomar).toHaveBeenCalled();
    expect(mockSomar).toHaveBeenCalledTimes(1);
    expect(mockSomar).toHaveBeenCalledWith(1,2);
    expect(mockSomar(1,2)).resolves.toBe(3);
});

//Mocks para limpar, resetar e restaurar.

//mock.mockClear() = para limpar os dados de uso de uma simulação entre dois expect.
//mock.mockReset() = faz o mesmo que a mockClear() = remove qualquer retorno estipulado ou implementação.
//util para resetar uma simulação para seu estado inicial

//mock.mockRestore() = faz o mesmo que mockReset() = restaura implementação original
//util para simular funções em certos casos de teste e restaurar a implementação original em outros

// primeiramente testar a funçao mockada somar implementando para ela um metodo de subtração, logo mais,
//redefinir mock

const math = require('./math');
test("#somar", ()=>{
    expect(math.somar(1,2)).resolves.toBe(3);// original

    //criando mock e substituindo a implementação para uma subtração
    math.somar = jest.fn().mockImplementation((a,b) => a - b);

    math.somar(5,1);
    expect(math.somar).toHaveBeenCalledTimes(1);
    expect(math.somar(5,1)).toBe(4);
    expect(math.somar).toHaveBeenCalledTimes(2);
    expect(math.somar).toHaveBeenCalledWith(5,1);

    //resetar mock
    math.somar.mockReset();
    expect(math.somar(1,2)).toBe(undefined);
    expect(math.somar).toHaveBeenCalledTimes(1);
    expect(math.somar).toHaveBeenCalledWith(1,2);
});

// pelo fato de ter usado o jest.fn() não é possível restaurar as implementações originais da função
//para isso, será utilizado o metodo jest.spyOn()

const math = require('./math');

test("#somar", ()=>{
    expect(math.somar(1,2)).resolves.toBe(3); // primeira implementação

    const mockSomar = jest
        .spyOn(math,"somar")
        .mockImplementation((a,b) =>a - b);
    
    math.somar(5,1);
    expect(mockSomar).toHaveBeenCalledTimes(1);
    expect(mockSomar(5,1)).toBe(4);
    expect(mockSomar).toHaveBeenCalledTimes(2);
    expect(mockSomar).toHaveBeenCalledWith(5,1);

    //restaurar a primeira func
    math.somar.mockRestore();
    expect(math.somar(1,2)).resolves.toBe(3);
});



// -------------- Mock e funções assincronas -------------------------

// utiliza-se as funções mockResolvedValues(valor) e mockRejectedValues(valor) 

function fetchURL() {
    return fetch('https://ghibliapi.herokuapp.com/species')
        .then(response => response.json()
        .then(json =>
            response.ok ? Promise.resolve(json) : Promise.reject(json)
        )  
    );
}

module.exports = { fetchURL };

//retorno do fetchURL é um array com 200 posições

//Mockando a requisição e fazer dois testes = para resolve e reject

const api = require("./api");

describe("testando a requisição", () => {
    const apiURL = jest.spyOn(api, "fetchURL");
    afterEach(apiURL.mockReset);

    test("testando requisição caso a promise resolva", async () =>{
        apiURL.mockResolvedValue('requisição realizada com sucesso');

        apiURL();
        expect(apiURL).toHaveBeenCalled();
        expect(apiURL).toHaveBeenCalledTimes(1);
        expect(apiURL()).resolves.toBe('requisição realizada com sucesso');
        expect(apiURL).toHaveBeenCalledTimes(2);
    });

    test("testando requisição caso a promise seja rejeitada", async () => {
        apiURL.mockRejectedValue('a requisição falhou');

        expect(apiURL).toHaveBeenCalledTimes(0);
        expect(apiURL()).rejects.toMatch('a requisição falhou');
        expect(apiURL).toHaveBeenCalledTimes(1);
    })
})

// sera carregado um array de objetos menor, como informado abaixo:

const api = require("./api");

const requestReturn = [
  {
    id: "b5a92d0e-5fb4-43d4-ba60-c012135958e4",
    name: "Spirit",
    classification: "Spirit",
    eye_colors: "Red",
    hair_colors: "Light Orange",
    url:
      "https://ghibliapi.herokuapp.com/species/b5a92d0e-5fb4-43d4-ba60-c012135958e4",
    people: [
      "https://ghibliapi.herokuapp.com/people/ca568e87-4ce2-4afa-a6c5-51f4ae80a60b"
    ],
    films: [
      "https://ghibliapi.herokuapp.com/films/0440483e-ca0e-4120-8c50-4c8cd9b965d6"
    ]
  }
];

test("testando requisição caso a promise resolva", async () => {
  apiURL = jest.fn().mockResolvedValue(requestReturn);

  // Mesma aplicação dos testes do exemplo anterior...
});













