-- consultando a data e hora atuais usando as seguintes funções:

SELECT CURRENT_DATE(); -- YYYY-MM-DD
SELECT NOW(); -- YYYY-MM-DD HH:MM:SS

-- Também podemos calcular a diferença em dias entre duas datas usando o DATEDIFF 
-- e a diferença de tempo entre dois horários usando o TIMEDIFF 

-- 30, ou seja, a primeira data é 30 dias depois da segunda
SELECT DATEDIFF('2020-01-31', '2020-01-01');

-- -30, ou seja, a primeira data é 30 dias antes da segunda
SELECT DATEDIFF('2020-01-01', '2020-01-31');

-- -01:00:00, ou seja, há 1 hora de diferença entre os horários
SELECT TIMEDIFF('08:30:10', '09:30:10');

-- Podemos extrair qualquer parte de uma data de uma coluna:
SELECT DATE(data_cadastro); -- YYYY-MM-DD
SELECT YEAR(data_cadastro); -- Ano
SELECT MONTH(data_cadastro); -- Mês
SELECT DAY(data_cadastro); -- Dia
SELECT HOUR(data_cadastro); -- Hora
SELECT MINUTE(data_cadastro); -- Minuto
SELECT SECOND(data_cadastro); -- Segundo

SELECT YEAR(CURRENT_DATE()); -- retorna o ano atual
SELECT HOUR(NOW()); -- retorna a hora atual

-- EXERCICIO 1
-- Monte uma query que exiba a diferença de dias entre '2030-01-20' e hoje.
SELECT DATEDIFF('2030-01-20', NOW());
-- OU
SELECT DATEDIFF('2030-01-20', CURRENT_DATE());

-- EXERCICIO 2
-- Monte uma query exiba a diferença de horas entre '10:25:45' e '11:00:00' .
SELECT TIMEDIFF('10:25:45','11:00:00');




























