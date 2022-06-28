# Nats-ts-node

This project presents a practical example of the concepts of [Nats](https://nats.io/). The App Client exposes some endpoints in NodeJs + Express. During application startup, subscribers are added to queues to listen to subjects. When a client invokes the endpoints, an event is published, and Nats persist that event in a stream. Subscribers are notified about the event, process them, and acknowledge Nats about the consumed event.

Below, show the resumed architecure

![](assets/20220628_122256_Diagram.drawio.png)

The following are the instructions to run

1) Start the environment:

```sh
docker-compose up
```

This command will start the Nats Server and three NodeJS Applications. The app node1 is configurated to be only publisher, other node apps (2 and 3) are publisher and subscriber.

--

Instalar o Nats CLI:

Fazer download em [https://github.com/nats-io/natscli/releases](https://github.com/nats-io/natscli/releases)
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
