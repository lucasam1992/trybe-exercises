
CREATE DATABASE `Escola`;
CREATE TABLE IF NOT EXISTS Escola.Alunos (
    `Nome` VARCHAR(7) CHARACTER SET utf8,
    `Idade` INT
);
INSERT INTO Escola.Alunos VALUES
    ('Rafael', 25),
    ('Amanda', 30),
    ('Roberto', 45),
    ('Carol', 19),
    ('Amanda', 25);

--  Monte uma query para encontrar pares únicos de nomes e idades
SELECT DISTINCT nome FROM Escola.Alunos;

-- Monte uma query para encontrar somente as idades únicas

SELECT DISTINCT Idade FROM Escola.Alunos;