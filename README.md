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

## Nats Jetstream

Criando um stream

```sh
nats stream add futebol_stream
```

Informações do stream

```sh
nats stream info futebol_stream
```

Publicando em um stream

```sh
nats pub brasileirao --count=1000 --sleep 1s "publication #{{Count}} @ {{TimeStamp}}"
```

Visualizando dados de um stream

```sh
nats stream view futebol_stream
```

Adicionando um consumidor

```sh
nats consumer add
```

Consumindo mensagens

```sh
nats consumer next futebol_stream [consumer-name] --count 1000
```
