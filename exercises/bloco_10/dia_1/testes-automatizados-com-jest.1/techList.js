const listaTecnologia = (techs, aluno) => {
    if (techs.length === 0)  return 'Vazio';

   return techs.sort().map((tech) => ({
            tech: tech,
            aluno,
        }));
}

module.exports = listaTecnologia;