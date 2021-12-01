import math

2 * 3  # saída: 6
2 + 3  # saída: 5
3 / 2  # saída: 1.5

square_root = 25 ** (1/2)  # raiz quadrada de 25. O operador `**` significa "
# elevado a"

print(square_root + 1)  # saída: 6.0

# original
counter = 0

counter = counter + 1

# simplificado
counter += 1

3 // 2  # saída: 1
3 / 2  # saída: 1.5

a = 5
print(type(a))

b = 5.0
print(type(b))

c = 5j
print(type(c))

# estruturas do tipo sequência( list , tuple , range ),
#  conjuntos( set , frozenset ), mapeamento( dict ),
# sequências binárias( bytes , bytearray , memoryview )

# LISTAS
# Sequência mutável e ordenada de elementos. Pode armazenar elementos
#  heterogêneos, tem seu tamanho variável e cresce a medida que itens
#  são adicionados.

fruits = ["orange", "apple", "grape", "pineapple"]  # elementos são definidos
# separados por vírgula, envolvidos por colchetes

fruits[0]  # o acesso é feito por indices iniciados em 0

fruits[-1]  # o acesso também pode ser negativo

fruits.append("banana")  # adicionando uma nova fruta

fruits.remove("pineapple")  # removendo uma fruta

fruits.extend(["pear", "melon", "kiwi"])  # acrescenta uma lista de frutas a
# lista original

fruits.index("apple")  # retorna o índice onde a fruta está localizada,
# neste caso 1 em seu programa
fruits.sort()  # ordena a lista de frutas

# Tuplas (tuple)
# São similares a listas, porém não podem ser modificados durante a execução
#  do programa.

user = ("Cássio", "Botaro", 42)  # elementos são definidos separados por
# vírgula, envolvidos por parenteses
user[0]  # acesso também por índices

# Conjuntos (set)
# Conjunto de elementos únicos e não ordenados
permissions = {"member", "group"}  # elementos separados por vírgula,
# envolvidos por chaves

permissions.add("root")  # adiciona um novo elemento ao conjunto

permissions.add("member")  # como o elemento já existe, nenhum novo item é
# adicionado ao conjunto

permissions.union({"user"})  # retorna um conjunto resultado da união

permissions.intersection({"user", "member"})  # retorna um conjunto resultante
# da intersecção dos conjuntos

permissions.difference({"user"})  # retorna a diferença entre os dois conjuntos


# Conjuntos imutáveis (frozenset)
# Variação do set, porém imutável, ou seja, seus elementos não podem ser
#  modificados durante a execução do programa.

permissions = frozenset(["member", "group"])  # assim como o set, qualquer
# estrutura iterável pode ser utilizada para criar um frozenset

permissions.union({"user"})  # novos conjuntos imutáveis podem ser criados à
# partir do original, mas o mesmo não pode ser modificado

permissions.intersection({"user", "member"})  # retorna um conjunto resultante
# da intersecção dos conjuntos

permissions.difference({"user"})  # retorna a diferença entre os dois conjuntos

# Dicionários (dict)

# Estrutura que associa uma chave a um determinado valor. É a representação do
# tão famoso objeto que utilizamos em JavaScript.

people_by_id = {1: "Cássio", 2: "João", 3: "Felipe"}  # elementos no formato
# "chave: valor" separados por vírgula, envolvidos por chaves

people_by_name = {"Cássio": 1, "João": 2, "Felipe": 3}  # outro exemplo, dessa
# vez usando strings como chaves (ao contrário de JS, as aspas duplas
#  são obrigatórias)

# elementos são acessados por suas chaves
people_by_id[1]  # saída: Cássio

# elementos podem ser removidos com a palavra chave del
del people_by_id[1]
people_by_id.items()  # dict_items([(1, "Cássio"), (2, "João"), (3, "Felipe")])
# um conjunto é retornado com tuplas contendo chaves e valores


# Range (range)
# Estrutura capaz de gerar uma sequência numérica de um valor inicial até um
#  valor final, modificando seu valor de acordo com o passo ( step ) definido

# vamos converter o range em uma lista para ajudar na visualização

# definimos somente o valor de parada
list(range(5))  # saída: [0, 1, 2, 3, 4]

# definimos o valor inicial e o de parada
list(range(1, 6))  # saída: [1, 2, 3, 4, 5]

# definimos valor inicial, de parada e modificamos o passo para 2
list(range(1, 11, 2))  # saída: [1, 3, ,5 ,7 , 9]

# podemos utilizar valores negativos para as entradas também
list(range(10, 0, -1))  # saída: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

# Estruturas Condicionais
salary = 7500
position = ""
if salary <= 2000:
    position = "estagiário"
elif 2000 < salary <= 5800:
    position = "júnior"
elif 5800 < salary <= 7500:
    position = "pleno"
elif 7500 < salary <= 10500:
    position = "senior"
else:
    position = "líder"

# Estruturas de repetição
restaurants = [
    {"name": "Restaurante A", "nota": 4.5},
    {"name": "Restaurante B", "nota": 3.0},
    {"name": "Restaurante C", "nota": 4.2},
    {"name": "Restaurante D", "nota": 2.3},
]

filtered_restaurants = []
min_rating = 3.0
for restaurant in restaurants:
    if restaurant["nota"] > min_rating:
        filtered_restaurants.append(restaurant)
print(filtered_restaurants)  # imprime a lista de restaurantes, sem o B e D

for index in range(5):
    print(index)

# Existe uma maneira mais "pythônica" de se fazer isto
# Quando uma nova lista é criada como resultado de uma iteração, podemos
#  simplificar utilizando compreensão de listas

min_rating = 3.0
filtered_restaurants = [restaurant for restaurant in restaurants if restaurant[
    "nota"] > min_rating]
print(filtered_restaurants)  # imprime a lista de restaurantes, sem o B e D

# While

n = 10
last, next = 0, 1
while last < n:
    print(last)
    last, next = next, last + next

# Funções


def soma(x, y):
    return x + y

    soma(2, 2)  # os parâmetros aqui são posicionais

    soma(x=2, y=2)  # aqui estamos nomeando os parâmetros

# Os parâmetros também podem ser variádicos. Ou seja, podem variar em sua
#  quantidade. Parâmetros posicionais variádicos são acessados como
#  tuplas no interior de uma função e parâmetros nomeados variádicos como
#  dicionário.


def concat(*strings):
    # Equivalente a um ", ".join(strings), que concatena os elementos de um
    #  iterável em uma string utilizando um separador
    # Nesse caso a string resultante estaria separada por vírgula
    final_string = ""
    for string in strings:
        final_string += string
        if not string == strings[-1]:
            final_string += ', '
    return final_string

# pode ser chamado com 2 parâmetros
    concat("Carlos", "João")  # saída: "Carlos, João"

# pode ser chamado com um número n de parâmetros
    concat("Carlos", "João", "Maria")  # saída: "Carlos, João, Maria"

# dict é uma função que já vem embutida no python
    dict(nome="Felipe", sobrenome="Silva", idade=25)  # cria um dicionário
    # utilizando as chaves passadas

    dict(nome="Ana", sobrenome="Souza", idade=21, turma=1)  # o número de
    # parâmetros passados para a função pode variar


# len([1, 2, 3, 4])  # função len não aceita argumentos nomeados

# len(obj=[1, 2, 3, 4])  # este código irá falhar

print("Botaro", "Cássio", ", ")  # imprime Botaro Cássio ,

print("Botaro", "Cássio", sep=", ")  # nomeando o terceiro parâmetro, agora
# temos a saída: Botaro, Cássio

# Clausula help
# help("if")

# help(abs)

# help(len)

help(math.sin)
