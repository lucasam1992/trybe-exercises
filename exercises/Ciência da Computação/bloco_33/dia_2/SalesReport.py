from abc import ABC, abstractmethod
import gzip
import json
from zipfile import ZipFile
from csv import DictWriter
# ############PARA ANTERIORMENTE - NAO VALE MAIS###############
# Para que se crie diversos compressores, é preciso, segundo estrutura do
# do código, que todos tenham o metodo compress
# Para isso, é necessario criar uma interface (tratado), que tera compress
# como metodo abstrato, assim respeitando a estrutura do código

'''
class Compressor(ABC):
    def __init__(self, filepath='./'):
        self.filepath = filepath

    @abstractmethod
    def compress(self, file_name):
        raise NotImplementedError


class ZipCompressor(Compressor):
    def compress(self, file_name):
        with ZipFile(file_name + '.zip', 'w') as zip_file:
            zip_file.write(file_name)


class GzCompressor(Compressor):
    def compress(self, file_name):
        with open(file_name, 'rb') as content:
            with gzip.open(file_name + '.gz', 'wb') as gzip_file:
                gzip_file.writelines(content)
'''


class Serializer(ABC):
    @abstractmethod
    def serialize(cls, data):
        raise NotImplementedError


class ZipCompressor(Serializer):
    FILE_PATH = './'

    '''Um método de classe é chamado diretamente da classe,
    sem uma instância, e ACESSA algum atributo ou método da classe!'''
    @classmethod
    def compress(cls, file_name):
        '''Repare que, acima, o atributo cls é como o self: o
        cls é a própria classe, passada automaticamente para
        um método de classe, enquanto o self é a instância'''
        with ZipFile(cls.FILE_PATH + file_name + '.zip', 'w') as zip_file:
            zip_file.write(file_name)


class GzCompressor(Serializer):
    '''Um método estático é chamado diretamente da classe,
    sem uma instância, e NÃO ACESSA nenhum atributo ou método da classe!'''
    @staticmethod
    def compress(file_name):
        '''Como métodos estáticos não acessam classe nem instância,
        o Python não dá a eles nenhum primeiro parâmetro'''
        with open(file_name, 'rb') as content:
            with gzip.open(file_name + '.gz', 'wb') as gzip_file:
                gzip_file.writelines(content)


class SalesReport(ABC):
    # Nossa classe agora espera *instâncias* de compressor como um parâmetro.
    # Temos um valor padrão para suportar o código que usava as SalesReport
    # sem parâmetros -- não precisa correr pra re-escrever nada ;)
    def __init__(self, export_file, compressor=GzCompressor()):
        self.export_file = export_file
        self.compressor = compressor

    def build(self):
        return [{
                'Coluna 1': 'Dado 1',
                'Coluna 2': 'Dado 2',
                'Coluna 3': 'Dado 3'
                },
                {
                'Coluna 1': 'Dado A',
                'Coluna 2': 'Dado B',
                'Coluna 3': 'Dado C'
                }]

    # Aqui temos um atributo de classe!
    FILE_EXTENSION = ''

    def get_export_file_name(self):
        # Aqui usamos o atributo de classe
        # Vai fazer mais sentido nas classes herdeiras!
        return self.export_file + self.FILE_EXTENSION

    def compress(self):
        self.serialize()
        self.compressor.compress(self.get_export_file_name())

    '''
    @abstractmethod
    def serialize(self):
        raise NotImplementedError
    '''


class SalesReportJSON(SalesReport):
    # Nós não reimplementamos o get_export_file_name
    # mas como ele usa um atributo de classe pra pegar a extensão
    # só de redefinir o atributo já vamos conseguir mudar o resultado!
    FILE_EXTENSION = '.json'

    def serialize(self):
        with open(self.get_export_file_name(), 'w') as file:
            json.dump(self.build(), file)


class SalesReportCSV(SalesReport):
    def serialize(self):
        with open(self.export_file + '.csv', 'w') as file:
            headers = ["Coluna 1", "Coluna 2", "Coluna 3"]
            csv_writer = DictWriter(file, headers)
            csv_writer.writeheader()
            for item in self.build():
                csv_writer.writerow(item)


# Para testar
relatorio_de_compras = SalesReportJSON('meu_relatorio_1')
relatorio_de_vendas = SalesReportJSON('meu_relatorio_2', ZipCompressor())

relatorio_de_compras.compress()
relatorio_de_vendas.compress()


# Uma classe abstrata é uma classe que serve de modelo para outras classes.
# Ela sempre será uma superclasse genérica, e suas subclasses serão mais
# específicas. Além disso, ela não pode ser instanciada e pode conter
# ou não métodos abstratos, podendo ser implementados nas classes descendentes.
# Interface é um conjunto de mensagens que um objeto pode interpretar
# No exemplo acima, para a classe SalesReport, sua interface é composta
# pelas funções build e serialize
# Métodos Abstratos : um método, ou função, que precisa ser implementado
# por uma classe herdeira para funcionar corretamente. Criado para definir
# uma Interface;
# Programação Orientada a Objetos garante interfaces bem definidas para
# as várias partes do nosso programa se comunicarem sem que se precise saber
# como, internamente, cada parte funciona
# Composição - Classes feitas de outras classes
#  Herança serve para especializar comportamentos, onde toda classe herdeira
# deve fazer tudo que a classe ascendente faz
#  Quando precisamos reusar código, ou os comportamentos começam a aparecer
# em somente algumas das classes herdeiras, prefira usar Composição
# Inversão de Depdencia = quem instância a classe escolhe com qual
# dependência (no nosso caso, o compressor) quer usá-la
# utilize herança para especialização de uma classe geral e composição
# para compartilhamento de código
