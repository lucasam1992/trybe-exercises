import platform

# https://docs.python.org/3/library/platform.html

print(
    f"Plataforma: {platform.system()}\n"
    f"Versão: {platform.release()}\n"
    f"Arquitetura: {platform.architecture()[0]}\n"
)
