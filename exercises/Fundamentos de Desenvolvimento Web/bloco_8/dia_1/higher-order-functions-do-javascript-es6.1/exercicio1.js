const newEmployees = (empregadoEmail) => {
    const employees = {
      id1: empregadoEmail('Pedro Guerra'),
      id2: empregadoEmail('Luiza Drumond'),
      id3: empregadoEmail('Carla Paiva')
    }
    return employees;
  };

const empregadoEmail = (nomeCompleto) => {
  const email = nomeCompleto.toLowerCase().split(' ').join('_');
  return {nome: nomeCompleto , email: `${email}@trybe.com`}
}
 
console.log(newEmployees(empregadoEmail));
