import readline from 'readline-sync';

import BookModel, { Book } from './models/Books';
import connection  from './models/connection';

const main = async () => {
    const bookModel = new BookModel(connection);

    const title = readline.question('Digite o título do livro: ');
    const price = readline.questionFloat('Digite o preço do livro: ');
    const author = readline.question('Digite o autor do livro: ');
    const isbn = readline.question('Digite o isbn do livro: ');
  
    const newBook: Book = { title , price , author , isbn };
  
    const createdBook = await bookModel.create(newBook);
    console.log(createdBook)

  const books = await bookModel.getAll();
  console.log(books);
}

main();