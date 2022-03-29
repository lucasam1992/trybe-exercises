// ./dipExample.js

//Faz requisição para API de Piadas

const axios = require('axios').default;
const fetch = require('node-fetch');

const url = 'https://icanhazdadjoke.com';

const requestWithAxios = () => {
    axios
      .get(url, {
        headers: { Accept: 'text/plain' },
      })
      .then((response) => console.log(response.data));
};

const requestWithFetch = () => {
  fetch(url, {
    headers: new fetch.Headers({
      Accept: 'application/json',
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data.joke))
    .catch((err) => console.log(err));
};

// Inversão de Dependência = Logo, quem usar vai decidir se quer com Fetch ou Axios
const getJokes = (numberOfJokes, jokeRequester = requestWithFetch) => {
  for (let i = 0; i < numberOfJokes; i += 1) requestWithFetch();
};

getJokes(5, requestWithAxios);

module.exports = { getJokes };