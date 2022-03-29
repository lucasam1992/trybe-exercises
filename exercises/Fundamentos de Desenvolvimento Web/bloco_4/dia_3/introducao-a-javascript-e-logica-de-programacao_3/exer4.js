let n= 5;
let entrada ='';
let asterisco='*';
let posicao=n;

let meioMatriz= (n+1)/2;
let direita=meioMatriz;
let esquerda=meioMatriz;

  
for(let index=0;index<=meioMatriz;index+=1){
   for(let index2=1;index2<=n;index2+=1){
        if(index2>direita && index2<esquerda){
            entrada= entrada + asterisco;
        }else{
            entrada= entrada + ' ';
        }
    }
    console.log(entrada);
    entrada='';
    posicao-=1;
    esquerda+=1;
    direita-=1;
}