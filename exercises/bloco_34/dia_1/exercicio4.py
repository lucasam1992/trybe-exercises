# https://docs.python.org/3/library/socketserver.html

from socketserver import TCPServer, StreamRequestHandler

ADDRESS = "", 8085


class EchoHandler(StreamRequestHandler):
    def handle(self):
        self.wfile.write(b"Hello, World!\n")
        for line in self.rfile:
            # esta linha responde o cliente
            self.wfile.write(line)
            # esta linha imprime no console
            print(line.decode('ascii').strip())


if __name__ == "__main__":
    # usando with nosso TCPServer vai arrumar a casa
    # direitinho quando encerrado
    with TCPServer(ADDRESS, EchoHandler) as server:
        server.serve_forever()
