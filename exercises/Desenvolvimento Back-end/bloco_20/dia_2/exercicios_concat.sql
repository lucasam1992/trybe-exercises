USE sakila;

SELECT * FROM actor;

SELECT CONCAT (first_name,' ', last_name) AS 'Nome Completo' FROM actor;

-- 1)
SELECT CONCAT (title, ' ', release_year) AS 'Lançamento do Filme' FROM film;

-- 2)
SELECT CONCAT(title, ' ', rating) AS 'Classificação' FROM film;

-- 3)
SELECT CONCAT(address, ' ', district) AS 'Endereço' FROM address;