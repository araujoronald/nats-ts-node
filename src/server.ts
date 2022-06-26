import 'dotenv/config'
import express from 'express'
import { principalRoutes } from './api/principal.routes'
import { natsConnector } from './conn/NatsConnector'
import { GoalSubscriber } from './events/GoalSubscriber'
import { MatchStartedSubscriber } from './events/MatchStartedSubscriber'
import { Logger } from './util/logger'


const start = async () => {

    const app = express()
    app.use(principalRoutes)


    if (!process.env.NATS_CLIENT_ID_PREFIX)
        throw Error('A variável NATS_CLIENT_ID_PREFIX não foi definida')

    if (!process.env.NATS_STREAM_NAME)
        throw Error('A variável NATS_STREAM_NAME não foi definida')

    if (!process.env.NATS_SERVER_URL)
        throw Error('A variável NATS_SERVER_URL não foi definida')

    const clientIdPrefix = String(process.env.NATS_CLIENT_ID_PREFIX)
    const streamName = String(process.env.NATS_STREAM_NAME)
    const serverUrl = String(process.env.NATS_SERVER_URL)

    await natsConnector.connect(
        clientIdPrefix,
        streamName,
        serverUrl
    )

    if (!process.env.ONLY_PUBLISHER) {
        new MatchStartedSubscriber(natsConnector.client).listen()
        new GoalSubscriber(natsConnector.client).listen()
    }

    const port = process.env.NODE_PORT
    app.listen(port, () => {
        Logger.info(`Service started on port ${port}`)
    })

}

start()


