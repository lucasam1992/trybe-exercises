-- Excluindo dados de uma tabela

DELETE FROM banco_de_dados.tabela
WHERE coluna = 'valor';
-- O WHERE é opcional. Porém, sem ele, todas as linhas da tabela seriam excluídas.

DELETE FROM sakila.actor
WHERE first_name = 'GRACE';
-- Erro ON DELETE RESTRICT

-- Para conseguir excluir este ator em actors , 
-- precisamos primeiro excluir todas as referências a ele na tabela sakila.film_actor :
DELETE FROM sakila.film_actor
WHERE actor_id = 7; -- actor_id = 7 é o Id de GRACE

-- Após excluir as referências, podemos excluir o ator com o nome "GRACE":
DELETE FROM sakila.actor
WHERE first_name = 'GRACE';

-- DELETE VS TRUNCATE limpar (excluir todos os registros)
-- TRUNCATE limpar (excluir todos os registros) não sendo possível especificar o WHERE 
-- Se tem certeza absoluta de que quer excluir os registros de uma tabela de 
-- uma maneira mais rápida, para efeitos de testes ou necessidade, o TRUNCATE é mais rápido que o DELETE . 
TRUNCATE banco_de_dados.tabela;

-- EXERCICIO 1
-- Exclua do banco de dados o ator com o nome de "KARL".
-- primeiro descobrir o ID 
SELECT * FROM sakila.actor
WHERE first_name = 'KARL';

-- segundo, apagar suas referencias
DELETE FROM sakila.film_actor
WHERE actor_id = 12;

-- depois excluir item original
DELETE FROM sakila.actor
WHERE first_name = 'KARL';

-- EXERCICIO 2
-- Exclua do banco de dados os atores com o nome de "MATTHEW".
SELECT * FROM sakila.actor
WHERE first_name = 'MATTHEW';

DELETE FROM sakila.film_actor
WHERE actor_id IN (8,103,181);

DELETE FROM sakila.actor
WHERE first_name = 'MATTHEW';

-- EXERCICIO 3
-- Exclua da tabela film_text todos os registros que possuem a palavra "saga" em suas descrições.
SELECT * FROM sakila.film_text;

DELETE FROM sakila.film_text
WHERE description LIKE '%saga%';

-- EXERCICIO 4
-- Apague da maneira mais performática possível todos os registros das tabelas film_actor e film_category .
TRUNCATE sakila.film_actor;
TRUNCATE sakila.film_category;

-- EXERCICIO 5
-- Inspecione todas as tabelas do banco de dados sakila e analise quais restrições ON DELETE 
-- foram impostas em cada uma. Use o Table Inspector para fazer isso (aba DDL).

-- EXERCICIO 6
-- Exclua o banco de dados e o recrie (use as instruções no início desta aula).

Abra o MySQL Workbench e se conecte a ele.
Selecione o banco sakila na lista de bancos de dados com o botão direito e clique em " Drop Schema ".
Selecione "Drop Now" .








































