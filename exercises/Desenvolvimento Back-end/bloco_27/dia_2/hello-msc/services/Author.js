const Author = require('../models/Author');

const getAll = async () => Author.getAll();

const findById = async (id) => {
    //solicita q o modelo faça busca no banco
    const author = await Author.findById(id);

    if(!author){
        return {
            error: {
                code:'notFound',
                message: `Ǹão foi possível encontrar um autor com o id ${id}`,
            },
        };
    }

    return author;
} 
    

const create = async (firstName, middleName, lastName) =>{
    //Author.create(firstName, middleName, lastName);
    const existingAuthor = await Author.findByName(firstName,middleName,lastName);

    if(existingAuthor) {
        return {
            error: {
                code: 'alreadyExists',
                message: 'Um autor já existe com esse nome completo',
            },
        };
    }

    return Author.create(firstName,middleName,lastName);

};

module.exports = {
  getAll,
  findById,
  create,
};