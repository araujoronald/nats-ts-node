# nats-ts-node

Subir o Nats Server:

```sh
docker-compose up
```

Instalar o Nats CLI:

Fazer download em <https://github.com/nats-io/natscli/releases>
<br>

Conectar no Nats Server utilizando o nats CLI

```sh
nats context add nats --server 0.0.0.0:4222 --description "NATS Docker local" --select
```

Se inscrever em um tópico

```sh
nats sub futebol.brasileiro
```

Publicar mensagem em um tópico

```sh
nats pub futebol.brasileiro "Bora Bahea"
```
