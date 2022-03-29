let peca_xadrez="BISPO";
let conv = peca_xadrez.toLowerCase();

switch(conv){
  case "rei":
    console.log("Todas as Direções - Uma vez");
    break;
 
  case "rainha":
    console.log("Ao longo da horizontal, vertical e diagonais");
    break;

  case "cavalo":
    console.log("L");
    break;

  case "torre":
    console.log("vertical ou horizontal");
    break;

  case "bispo":
    console.log("Diagonal");
    break;

  case "peao":
    console.log("Frente");
    break;
  
  default: 
    console.log("Peca Invalida");
    break;
}
