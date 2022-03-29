SELECT 'Olá, bem-vindo ao SQL!';
SELECT 10;
SELECT now();
SELECT 20*2;
SELECT 50/2;
SELECT 18 AS idade;
SELECT 2019 AS ano;
SELECT 'Rafael', 'Martins', 25, 'Desenvolvedor Web';
SELECT 'Rafael' AS nome, 'Martins' As sobrenome, 25 AS idade, 'Desenvolvedor Web' As 'Área de atuação';

SELECT 'Lucas' AS nome, 'Machado' As sobrenome, 'Porto Alegre' AS 'cidade natal', '28' AS idade;

SELECT 13*8;

SELECT now() AS 'Data Atual';

-- Exercicios fixação

-- 1) Escreva uma query que selecione todas as colunas da tabela city ;

SELECT * FROM sakila.city;

-- 2) Escreva uma query que exiba apenas as colunas first_name e last_name da tabela customer ;

SELECT first_name, last_name FROM sakila.customer;

-- 3) Escreva uma query que exiba todas as colunas da tabela rental ;

SELECT * FROM sakila.rental;

-- 4) Escreva uma query que exiba o título, a descrição e a data de lançamento dos 
-- filmes registrados na tabela film ;

SELECT title, description, release_year FROM sakila.film;

-- 5) Utilize o SELECT para explorar todas as tabelas do banco de dados.

SELECT * FROM sakila;







