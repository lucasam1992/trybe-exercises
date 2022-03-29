let info = {
  personagem: "Margarida",
  origem: "Pato Donald",
  nota: "Namorada do personagem principal nos quadrinhos do Pato Donald",
};

console.log('Bem-Vinda, ' +info.personagem);
console.log('Bem-Vinda ' +info['personagem']);

info.recorrente='sim';
info['recorrente']='sim';

console.log(info);

for(let index in info){
    console.log(index);
}

for(let index in info){
    console.log(info[index]);
}

let info2 = {
    personagem: "Tio Patinhas",
    origem: "Christmas on Bear Mountain, Dell's Four Color Comics #178",
    nota: "O último MacPatinhas",
    recorrente:"sim"
}


for(let index in info){
    if(info[index]=== info.recorrente && info[index]==='sim' && info2[index]==='sim'){
        console.log("Ambos recorrentes");
    }else{
        console.log(info[index] + " e " + info2[index]);
    }
}