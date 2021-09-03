const connection = require('./connection');

const {ObjectId} = require('mongodb');

const getNewBook = (bookData) => {
    const { id, title, author_id } = bookData;

    return {
        id,
        title,
        author_id,
    };
};

//converter o nome dos campos de snake_case para camelCase

const serialize = (bookData) => ({
    id: bookData.id,
    title: bookData.title,
    authorId: bookData.author_id
});

// busca todos os livros do banco
/*
const getAllBooks = async () => {
    const [books] = await connection.execute(
        'SELECT * FROM model_example.books;',
    );
    return books.map(serialize).map(getNewBook);
};
*/

/*
const getByAuthorId = async (authorId) => {
    const query = 'SELECT * FROM model_example.books WHERE author_id=?;'
    const [books] = await connection.execute(query, [authorId]);

    return books.map(({id, title, author_id}) => ({
        id,
        title,
        authorId: author_id,
    }));
};
*/

const getById = async (id) => {
    const query = 'SELECT * FROM model_example.books WHERE id =?;'

    const [books] = await connection.execute(query,[id]);

    if(books.length ===0) return null;

    return books.map(({id, title, author_id}) =>({
        id,
        title,
        authorId:author_id,
    }))[0];
};


// MONGOBD

const getAllBooks = () => connection().then((db) => db.collection('books').find({}).toArray());

const getByAuthorId = (authorId) => connection()
    .then((db) => db.collection('books').find({ author_id: Number(authorId) }).toArray());


const findById = async (id) => {
    const book = await connection().then((db) => db.collection('books').findOne(new ObjectId(id)));

    if(!book) return null;

    return book;
}

module.exports = {
    getAllBooks,
    getByAuthorId,
    getById,
    findById,
};