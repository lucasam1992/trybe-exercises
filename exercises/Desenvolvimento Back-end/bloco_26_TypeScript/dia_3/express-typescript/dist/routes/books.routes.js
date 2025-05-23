"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_controller_1 = __importDefault(require("../controllers/books.controller"));
const router = (0, express_1.Router)();
const booksController = new books_controller_1.default();
/*
router.get('/books', booksController.getAll);
router.get('/books/:id', booksController.getById);
router.post('/books', booksController.create);
router.put('/books/:id', booksController.update);
*/
router
    .route('/books')
    .get(booksController.getAll)
    .post(booksController.create);
router
    .route('/books/:id')
    .get(booksController.getById)
    .put(booksController.update)
    .delete(booksController.remove);
exports.default = router;
