from abc import ABC, abstractmethod
from datetime import datetime


class ManipuladorDeLog(ABC):
    @classmethod
    @abstractmethod
    def log(cls, mensagem):
        raise NotImplementedError


class LogEmArquivo(ManipuladorDeLog):
    @classmethod
    def log(cls, mensagem):
        with open('log.txt', 'a') as arq:
            print(mensagem, file=arq)


class LogEmTela(ManipuladorDeLog):
    @classmethod
    def log(cls, mensagem):
        print(mensagem)


class Log:
    def __init__(self, manipuladores):
        self.__manipuladores = set(manipuladores)

    def add_manipuladores(self, manipulador):
        self.__manipuladores.add(manipulador)

    def info(self, mensagem):
        self.__log('info', mensagem)

    def alert(self, mensagem):
        self.__log('Alerta', mensagem)

    def erro(self, mensagem):
        self.__log('erro', mensagem)

    def debug(self, mensagem):
        self.__log('debug', mensagem)

    def __log(self, nivel, mensagem):
        for manipulador in self.__manipuladores:
            manipulador.log(self.__formatar(nivel, mensagem))

    def __formatar(self, nivel, mensagem):
        data = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        return f"[{nivel} - {data}]: {mensagem}"
