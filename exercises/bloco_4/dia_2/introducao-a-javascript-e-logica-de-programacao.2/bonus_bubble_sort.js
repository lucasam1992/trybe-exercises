let values=[1,5,90,12,43,65,3,45];
for (let i = 1; i < values.length; i++) {
  for (let j = 0; j < i; j++) {
    if (values[i] < values[j]) {
      let position = values[i];
       values[i] = values[j];
      values[j] = position;
    }
  }
}

console.log(values);


//Ainda falta fazer o numero 27 multiplicar por 2 e colocar no final do array

let values = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let calculo=[];

for (let i = 0; i < values.length; i++) {
  if(i==values.length-1){
   calculo.push(values[i]*2);
  }else{
    calculo.push(values[i]*values[i+1]);
  }
}
console.log(calculo);







