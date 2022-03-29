SELECT t1.title, t1.replacement_cost, t2.title, t2.replacement_cost
FROM sakila.film AS t1, sakila.film AS t2
WHERE t1.length = t2.length;

-- EXERCICIO 1
-- Queremos saber os ids e custos de substituição dos filmes que possuem 
-- o mesmo custo de substituição.
SELECT f1.film_id, f1.replacement_cost, f2.film_id, f2.replacement_cost
FROM sakila.film f1, sakila.film f2
WHERE f1.replacement_cost = f2.replacement_cost;

-- EXERCICIO 2
-- Exiba o título e a duração de empréstimo dos filmes que possuem a mesma duração.
-- Exiba apenas os filmes com a duração de empréstimo entre 2 e 4 dias.
SELECT * FROM sakila.film;

SELECT f1.title, f1.rental_duration, f2.title, f2.rental_duration
FROM sakila.film f1, sakila.film f2
WHERE f1.rental_duration = f2.rental_duration
HAVING f1.rental_duration BETWEEN 2 AND 4;



































