//exercicio 1

const fazFatorial = n => {
    let fat = 1;
    for(let index=1; index<=n;index+=1){
        fat*=index;
    }
    return fat;
}

console.log(fazFatorial(4));

//recursivo

const fat = n => n>1 ? n*fat(n-1) : 1
console.log(fat(4));

//exer2
const longestWord = text => {
    let wordArray = text.split(' ');
    let maxLength = 0;
    let result = '';

    for (const word of wordArray) {
        if (word.length > maxLength) {
            maxLength = word.length;
            result = word;
        }
    }

    return result;
}

console.log(longestWord("Antonio foi no banheiro e não sabemos o que aconteceu"));

const longestWord = text => text.split(' ').sort((wordA, wordB) => wordB.length - wordA.length)[0]

console.log(longestWord("Antonio foi no banheiro e não sabemos o que aconteceu"))



//exer4

const array = ["Android", "iOS", "Architecture", "Teach", "Run"];

function buildSkillsPhrase (paramOne) {
    const fun1 = paramInner => (
      `Tryber ${paramInner} aqui!

      Tudo bem?`
    )

    let result = `${fun1(paramOne)};

    Minhas cinco principais habilidades são:`

    array.forEach((skill, index) =>
    result = `${result}

    - ${skill}`)

    result = `
${result}

    #goTrybe
    `

    return result;
}

console.log(buildSkillsPhrase("Lucas"));