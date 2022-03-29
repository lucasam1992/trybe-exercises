# Banco de Dados
from pymongo import MongoClient

# Por padrão o host é localhost e porta 27017
# Estes valores podem ser modificados passando uma URI
# client = MongoClient("mongodb://localhost:27017/")
client = MongoClient()
# o banco de dados catalogue será criado se não existir
db = client.catalogue
# a coleção books será criada se não existir
students = db.books
client.close()  # fecha a conexão com o banco de dados


# adicionando documentos no banco utilizando insert_one:
client = MongoClient()
db = client.catalogue
# book representa um dado obtido na raspagem
book = {
    "title": "A Light in the Attic",
}
document_id = db.books.insert_one(book).inserted_id
print(document_id)
client.close()  # fecha a conexão com o banco de dados

# Quando inserido, resposta do terminal = 61dce7ef9ca5478a3b357205

# inserindo varios documentos
client = MongoClient()
db = client.catalogue
# book representa um dado obtido na raspagem
book = {
    "title": "A Light in the Attic",
}
document_id = db.books.insert_one(book).inserted_id
print(document_id)
client.close()  # fecha a conexão com o banco de dados

#resposta do terminal => 61dce82b3a1edc1e7e32df3f
# 61dce82b3a1edc1e7e32df41


# fazendo buscas usando find ou find_one:
# busca um documento da coleção, sem filtros
client = MongoClient()
db = client.catalogue
print(db.books.find_one())
# busca utilizando filtros
for book in db.books.find({"title": {"$regex": "t"}}):
    print(book["title"])
client.close()  # fecha a conexão com o banco de dados


# O nosso cliente é um gerenciador de contexto ( with ), logo podemos
#  utilizá-lo como tal, evitando problemas com o fechamento da conexão com o banco de dados:
with MongoClient() as client:
    db = client.database
    for book in db.books.find({"title": {"$regex": "t"}}):
        print(book["title"])


# Scrapy
# 🕷 Uma excelente e poderosa ferramenta para raspagem de dados é a Scrapy 
# . Ela possui, em sua implementação, todos mecanismos citados anteriormente
#  e outros recursos adicionais.
