// Enum ou enumeração

// enum é um nome simbólico para um conjunto de valores relacionados, o que significa que você pode 
// utilizá-la para criar um conjunto de constantes para uso com variáveis e propriedades.

enum StudentStatus {
    Active,
    Inactive,
    Paused
}

// Agora, vamos declarar uma variável para uma nova pessoa estudante do tipo StudentStatus e atribuir o tipo Inactive.

let newStudentStatus: StudentStatus = StudentStatus.Inactive; // referenciamos um enum usando EnumName.Value
console.log(newStudentStatus); //saída: 1

// Por padrão, uma enum é baseada em números. Os valores começam de zero e para cada opção é assinalado
// um número incrementado por 1, assim como os índices de um array.

// Para termos a nossa enum refletindo os valores que temos no banco de dados externo, precisamos declarar isso da seguinte forma:
/* enum StudentStatus {
    Active = 1,
    Inactive,
    Paused
  }
*/

// Atribuir o número 1 para o primeiro valor da nossa enum já é o suficiente. Agora, quando imprimirmos a nossa variável newStudentStatus o valor será 2 - como era esperado.

// let newStudentStatus: StudentStatus = StudentStatus.Inactive;
// console.log(newStudentStatus); //saída: 2

// Sempre que parte da sua lógica aceitar um conjunto limitado de valores, considere utilizar uma enum. 

// Enums suportam o acesso ao dado em ambos as direções: da chave ao valor e do valor à chave.

enum StatusCodes {
    OK = 200,
    BadRequest = 400,
    Unauthorized,
    PaymentRequired,
    Forbidden,
    NotFound,
  }
  
  const ok = StatusCodes.OK;
  const indiceOk = StatusCodes["OK"];
  const stringBadRequest = StatusCodes[400];
  
  console.log(ok); //saída: 200
  console.log(indiceOk); //saída: 200
  console.log(stringBadRequest); //saída: BadRequest

// Podem ser de diferentes tipos, sendo o tipo string o mais comum.

enum directionsGamePad {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGTH = "RIGHT",
}
