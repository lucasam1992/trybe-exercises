# Rate Limit
# Quando o site nos bloqueia por alguns minutos devido a um numero
#  alto de requisisções. Exemplo:
# import requests


# À partir da décima requisição somos bloqueados de acessar o recurso
# Código de status 429: Too Many Requests
# for _ in range(15):
#    response = requests.get("https://www.cloudflare.com/rate-limit-test/")
#    print(response.status_code)


# Uma boa prática é sempre colocarmos um uma pausa entre as requisições
# , ou lote delas, mesmo que o website, onde a informação está, não
#  faça o bloqueio, assim evitamos tirar o site do ar.
# import requests
# import time


# Coloca uma pausa de 6 segundos a cada requisição
# Obs: este site de exemplo tem um rate limit de 10 requisições por minuto
# for _ in range(15):
#    response = requests.get("https://www.cloudflare.com/rate-limit-test/")
#    print(response)
#    time.sleep(3)


# Timeout
# Ás vezes pedimos um recurso ao servidor, mas caso o nosso tráfego de rede
#  esteja lento ou tenha um problema interno do servidor, nossa resposta
#  pode demorar ou até mesmo ficar travada indefinidamente.
# import requests

# Por 10 segundos não temos certeza se a requisição irá retornar
# response = requests.get("https://httpbin.org/delay/10")
# print(response)

# Podemos definir um tempo limite (timeout) para que, após este
#  tempo, possamos tomar alguma atitude como por exemplo,
#  realizar uma nova tentativa.
import requests


try:
    # recurso demora muito a responder
    response = requests.get("http://httpbin.org/delay/10", timeout=2)
except requests.ReadTimeout:
    # vamos fazer uma nova requisição
    response = requests.get("http://httpbin.org/delay/1", timeout=2)
finally:
    print(response.status_code)
