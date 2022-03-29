''' Estes metodos DEVEM ser implementados pelas classes herdeiras, por isso
utilizamos o decorator `@abstractmethod`: se estes metodos não
forem sobrescritas por
uma implementação da classe herdeira, o Python nos avisará que
estamos cometendo um erro.'''

from abc import ABC, abstractmethod


class ReadOnlyConnector(ABC):
    @abstractmethod
    def get_count(self, token):
        pass


# Como FullConnector deve também ser capaz de ler,
# ela é uma classe abstrata que herda de outra classe abstrata!
class FullConnector(ReadOnlyConnector):
    @abstractmethod
    def count_request(self, token):
        pass

# # Uma classe abstrata exige a implementação de todos os seus métodos.
# # Uma implementação incompleta não poderá ser instanciada!
# # class SQLConnector(FullConnector):
# #     def count_request(self, token):
# #         ...
# #
# # TypeError: não pode instanciar porque não implementa o método get_count
# # sql = SQLConnector()

# Esta divisão de tarefas onde cada interface tem a responsabilidade de
#  representar uma única característica é chamada de Princípio De
#  Segregação de Interfaces , ou em inglês, Interface Segregation Principle.
#  Justamente o I dos nossos princípios S.O.L.I.D.!

# S - Single Responsability Principle - Princípio da Responsabilidade Única
# O - Open/Closed - Aberto para extensão, fechado para modificação
# L - Liskov's Substitution Principle - Principio da Substituição de Liskov
# I - Interface Segregation Principle - Principio da Segregação de Interfaces
# D - Dependency Inversion - Inversão de Dependências (ou: use composições!)
