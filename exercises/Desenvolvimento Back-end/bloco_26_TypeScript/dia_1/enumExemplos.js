// Enum ou enumeração
// enum é um nome simbólico para um conjunto de valores relacionados, o que significa que você pode 
// utilizá-la para criar um conjunto de constantes para uso com variáveis e propriedades.
var StudentStatus;
(function (StudentStatus) {
    StudentStatus[StudentStatus["Active"] = 0] = "Active";
    StudentStatus[StudentStatus["Inactive"] = 1] = "Inactive";
    StudentStatus[StudentStatus["Paused"] = 2] = "Paused";
})(StudentStatus || (StudentStatus = {}));
// Agora, vamos declarar uma variável para uma nova pessoa estudante do tipo StudentStatus e atribuir o tipo Inactive.
var newStudentStatus = StudentStatus.Inactive; // referenciamos um enum usando EnumName.Value
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
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    StatusCodes[StatusCodes["BadRequest"] = 400] = "BadRequest";
    StatusCodes[StatusCodes["Unauthorized"] = 401] = "Unauthorized";
    StatusCodes[StatusCodes["PaymentRequired"] = 402] = "PaymentRequired";
    StatusCodes[StatusCodes["Forbidden"] = 403] = "Forbidden";
    StatusCodes[StatusCodes["NotFound"] = 404] = "NotFound";
})(StatusCodes || (StatusCodes = {}));
var ok = StatusCodes.OK;
var indiceOk = StatusCodes["OK"];
var stringBadRequest = StatusCodes[400];
console.log(ok); //saída: 200
console.log(indiceOk); //saída: 200
console.log(stringBadRequest); //saída: BadRequest
// Podem ser de diferentes tipos, sendo o tipo string o mais comum.
var directionsGamePad;
(function (directionsGamePad) {
    directionsGamePad["UP"] = "UP";
    directionsGamePad["DOWN"] = "DOWN";
    directionsGamePad["LEFT"] = "LEFT";
    directionsGamePad["RIGTH"] = "RIGHT";
})(directionsGamePad || (directionsGamePad = {}));
