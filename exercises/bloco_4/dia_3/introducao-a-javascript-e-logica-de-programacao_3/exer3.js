let n= 5;
let entrada ='';
let asterisco='*';
let posicao=n;

  
for(let index=0;index<n;index+=1){
   for(let index2=0;index2<=n;index2+=1){
        if(index2 < posicao){
            entrada= entrada + ' ';
        }else{
            entrada= entrada+ asterisco;
        }
    }
    console.log(entrada);
    entrada='';
    posicao-=1;
}


