const rightAnswers =   ['A', 'C', 'B', 'D', 'A', 'A', 'D', 'A', 'D', 'C'];
const studentAnswers = ['A', 'N.A', 'B', 'D', 'A', 'C', 'N.A', 'A', 'D', 'B'];

const checaResposta = (rightAnswers, studentAnswers) => {
 if(rightAnswers === studentAnswers){
    return 1;
 }else if( studentAnswers === 'N.A'){
    return 0;
 }else{
    return 0.5;
 }
}   

const HOFChecaResposta = (rightAnswers, studentAnswers, checaResposta) => {
    let count =0;
    for(let index=0; index< rightAnswers.length; index += 1){
        const checkResp = checaResposta(rightAnswers[index], studentAnswers[index]);
        count += checkResp;
    }

    return `Resultado final: ${count} corretas`;
};

console.log(HOFChecaResposta(rightAnswers, studentAnswers, checaResposta));