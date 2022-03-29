-- INSERT - comando para inserir elementos na tabela
INSERT INTO nome_da_tabela (coluna1, coluna2)
VALUES ('valor_coluna1', 'valor_coluna2');

-- Inserindo multiplas linhas em uma tabela
INSERT INTO nome_da_tabela (coluna1, coluna2) VALUES
('valor_1','valor_2'),
('valor_3','valor_4'),
('valor_5','valor_6');

INSERT IGNORE INTO pessoas (id, name) VALUES
(4,'Gloria'), -- Sem o IGNORE, essa linha geraria um erro e o INSERT não continuaria.
(5,'Amanda');

-- Pesquisando agora, você verá que a informação duplicada não foi inserida.
-- Porém os dados corretos foram inseridos com sucesso.
SELECT * FROM pessoas;

-- Inserindo valores em colunas com auto_increment
INSERT INTO sakila.actor (first_name, last_name)
VALUES('Marcelo','Santos');

-- INSERT SELECT (Inserindo dados de uma outra tabela)
INSERT INTO tabelaA (coluna1, coluna2)
    SELECT tabelaB.coluna1, tabelaB.coluna2
    FROM tabelaB
    WHERE tabelaB.nome_da_coluna <> 'algumValor'
    ORDER BY tabelaB.coluna_de_ordenacao;

-- Por exemplo, para trazer os dados da tabela sakila.staff para a tabela sakila.actor , poderíamos fazer:
INSERT INTO sakila.actor (first_name, last_name)
SELECT first_name, last_name FROM sakila.staff;

-- EXERCICIO 1
-- Insira um novo funcionário na tabela sakila.staff
INSERT INTO `sakila`.`staff`
(first_name, last_name, address_id, email, store_id, active,username,password) VALUES
('Geralt','of Rivia',2,'tossacoin@gmail.com',1,1,'geralt','theWhiteWolf');

-- EXERCICIO 2
-- Insira dois funcionários novos em apenas uma query .
INSERT INTO `sakila`.`staff`
(first_name, last_name, address_id, email, store_id, active,username,password) VALUES
('Lucas','Machado',2,'lucas@gmail.com',1,1,'luckk','chimba123'),
('Bruno','Almeida',2,'bruno@gmail.com',1,1,'bruck','choco151');

-- EXERCICIO 3
-- Selecione os cinco primeiros nomes e sobrenomes da tabela sakila.customer 
-- e cadastre essas pessoas como atores na tabela sakila.actor .
INSERT INTO sakila.actor(first_name, last_name)
SELECT first_name, last_name
FROM sakila.customer
ORDER BY customer_id
LIMIT 5;

-- EXERCICIO 4
-- Cadastre três categorias de uma vez só na tabela sakila.category .
INSERT INTO sakila.category(name) VALUES
('Sci-Fi'),
('Fantasy'),
('Biography');

-- EXERCICIO 5
-- Cadastre uma nova loja na tabela sakila.store .
INSERT INTO sakila.store(manager_staff_id, address_id) VALUES
(3,3);







SELECT * FROM sakila.store;

















