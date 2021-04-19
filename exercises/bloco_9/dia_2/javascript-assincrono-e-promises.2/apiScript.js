// apiScript.js     
/*
const API_URL = 'https://icanhazdadjoke.com/';

const fetchJoke = () => {
  fetch(API_URL, {headers: { 'Accept': 'application/json' }})
  .then(response => response.json())
  .then(data => document.getElementById('jokeContainer').innerText = data.joke
  );
};

window.onload = () => fetchJoke();
*/

//exercicio2
/*
const fetchPromise = () => {
  const myPromise = new Promise((resolve, reject) => {
    const myArray = Array.from(
      {length: 10},
      () => Math.floor(Math.random()*50) +1
    );
  const sum = myArray.map(number => number* number)
                     .reduce((sum, number) => sum + number);
  (sum < 8000) ? resolve() : reject();
  });

  myPromise
    .then(() => console.log('Promise resolvida'))
    .catch(() => console.log('Promise rejeitada'));
};

fetchPromise();


//exercicio 3
const fetchPromise = () => {
  const myPromise = new Promise((resolve, reject) => {
    const myArray = Array.from(
      {length: 10},
      () => Math.floor(Math.random()*50) +1
    );
  const sum = myArray.map(number => number* number)
                     .reduce((sum, number) => sum + number,0);
  (sum < 8000) ? resolve() : reject();
  });

  myPromise
    .then(sum => [2,3,5,10].map(number => sum/number))
    .catch(() => console.log('Promise rejeitada'));
};

fetchPromise();


//exercicio4
const fetchPromise = () => {
  const myPromise = new Promise((resolve, reject) => {
    const myArray = Array.from(
      {length: 10},
      () => Math.floor(Math.random()*50) +1
    );
  const sum = myArray.map(number => number* number)
                     .reduce((sum, number) => sum + number,0);
  (sum < 8000) ? resolve() : reject();
  });

  myPromise
    .then(sum => [2,3,5,10].map(number => sum/number))
    .catch(() => console.log('É mais de oito mil! Essa promise deve ser quebrada'));
};

fetchPromise();


//exercicio5
const fetchPromise = () => {
  const myPromise = new Promise((resolve, reject) => {
    const myArray = Array.from(
      {length: 10},
      () => Math.floor(Math.random()*50) +1
    );
  const sum = myArray.map(number => number* number)
                     .reduce((sum, number) => sum + number,0);
  (sum < 8000) ? resolve() : reject();
  });

  myPromise
    .then(sum => [2,3,5,10].map(number => sum/number))
    .then(array =>array.reduce((number, acc) => number + acc, 0))
    .catch(() => console.log('É mais de oito mil! Essa promise deve ser quebrada'));
};

fetchPromise();
*/

//exercicio BONUS
const sumRandomNumbers = () => {
  const myArray = Array.from(
    {length:10},
    ()=>Math.floor(Math.random()*50)+1
  );
  const sum = myArray.map(number => number * number)
                     .reduce((number, acc) => number + acc,0);
  if(sum >= 8000){
    throw new Error();
  }
  return sum;
}

const sumArrayFromSum = (sum) => [2,3,5,10].map(number => sum/ number)
  .reduce((number,acc) => number + acc);

const fetchPromise = async () => {
  try{
    const sum = await sumRandomNumbers();
    const sumFromSum = await sumArrayFromSum(sum);
  }catch(error){
    console.log('É mais de oito mil! Essa promise deve estar quebrada!');
  }
}

fetchPromise();


