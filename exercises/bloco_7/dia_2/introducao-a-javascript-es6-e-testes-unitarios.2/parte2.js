const lesson1 = {
    materia: 'Matemática',
    numeroEstudantes: 20,
    professor: 'Maria Clara',
    turno: 'manhã',
  };
  
  const lesson2 = {
    materia: 'História',
    numeroEstudantes: 20,
    professor: 'Carlos',
  };
  
  const lesson3 = {
    materia: 'Matemática',
    numeroEstudantes: 10,
    professor: 'Maria Clara',
    turno: 'noite',
  };

const novaChave = (objeto,chave,valor) => {
    objeto[chave] = valor;
};

novaChave(lesson2,'turno','manha');


const listarChaves = (objeto) =>  Object.keys(objeto);

console.log(listarChaves(lesson1));

const tamanhoObjeto = (objeto) => Object.keys(objeto).length;

console.log(tamanhoObjeto(lesson1));

const listarValores = (objeto) => Object.values(objeto);

console.log(listarValores(lesson2));

const allLessons = Object.assign({},{lesson1, lesson2, lesson3});

console.log(allLessons);

const NumTotalStudantes = (objeto) => {
    let total = 0;
    const alunos = Object.keys(objeto);
    for(let index in alunos){
        total += objeto[alunos[index]].numeroEstudantes;
    }
    return total;
};

console.log(NumTotalStudantes(allLessons));

const valorChave = (objeto, numero) => Object.values(objeto)[numero];

console.log(valorChave(lesson2,2));

const verificarPar = (objeto,chave,valor) => {
    const conjunto = Object.entries(objeto);
    let igual = false;
    for(let index in conjunto) {
        if(conjunto[index][0] === chave && conjunto[index][1] === valor){
            igual = true;
        }
    }
    return igual;
};

console.log(verificarPar(lesson2,'professor','Carlos'));


//BONUS


const contaNumeroEstudantes = (objeto) => {
    let total =0;
    const pegaObjeto = Object.keys(objeto);
    for(let index in pegaObjeto) {
        if(objeto[pegaObjeto[index]].materia === 'Matemática'){
            total += objeto[pegaObjeto[index]].numeroEstudantes;
        }
    }
    return total;
}

console.log(contaNumeroEstudantes(allLessons));


const relatorioGeral = (objeto, nome) => {
    const licoes = [];
    let estudantes = 0;
    const recebeObjeto = Object.values(objeto);
    for(let index in recebeObjeto){
        if(recebeObjeto[index].professor === nome) {
            licoes.push(recebeObjeto[index].materia)
            estudantes += recebeObjeto[index].numeroEstudantes;
        }
    }
    return { lessons: licoes, estudantes: estudantes};
}

const criaRelatorio = (allLessons, nome) => {
    const relatorio = {};
    relatorio.professor = nome;
    Object.assign(relatorio, relatorioGeral(allLessons,nome));
    return relatorio;
}

console.log(criaRelatorio(allLessons, 'Maria Clara'));
