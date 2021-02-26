let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let soma=0;
let counter=0;

for(let index=0; index<numbers.length; index+=1){
    soma=soma+numbers[index];
    counter+=1;
}

let media = soma/counter;

console.log(media);