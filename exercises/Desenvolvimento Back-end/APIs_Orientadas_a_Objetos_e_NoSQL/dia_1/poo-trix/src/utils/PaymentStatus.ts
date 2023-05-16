enum PaymentStatus {
    pending = 0,
    concluded = 1,
    reversed = 2,
}

export default PaymentStatus;

// enum é útil quando é necessário usar um conjunto limitado de valores
// Enums suportam o acesso ao dado em ambas as direções: da chave ao valor e do valor à chave.

/*
const pendingCode = PaymentStatus.pending;
const indexPending = PaymentStatus["pending"];
const stringReversed = PaymentStatus[3];

console.log(pendingCode); // saída: 1
console.log(indexPending); // saída: 1
console.log(stringReversed); // saída: reversed
*/