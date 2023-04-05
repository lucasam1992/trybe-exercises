import sequelize from "sequelize";
import Author from "./src/database/models/AuthorModel";
import Book from "./src/database/models/BookModel";

(async () => {
    // const authors = await Author.findAll();
    // const books = await Book.findAll();
    // console.table(authors.map((author) => author.toJSON()));
    // console.table(books.map((book) => book.toJSON()));
    const data = await Author.findAll({
        include: {
            model: Book,
            attributes: [],
        },
        attributes: [
            ['name', 'author'],
            [sequelize.fn('COUNT', sequelize.col('books.id')), 'totalBooks'],
        ],
        group: 'authors.name',
        raw: true,
    });

    console.log(data);
    process.exit(0);
})();
