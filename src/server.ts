import { randomInt } from 'crypto'
import express from 'express'
import { principalRoutes } from './api/principal.routes'
import { natsWrapper } from './conn/NatsWrapper'
import { GolSubscriber } from './events/GolSubscriber'
import { PartidaIniciadaSubscriber } from './events/PartidaIniciadaSubscriber'


const start = async () => {
    const app = express()

    app.use(principalRoutes)

    await natsWrapper.connect(
        'modulo1',
        'futebol',
        'nats://0.0.0.0:4222'
    )

    new PartidaIniciadaSubscriber(natsWrapper.client).listen()
    new GolSubscriber(natsWrapper.client).listen()

    const port = randomInt(3000, 3005)
    app.listen(port, () => {
        console.log(`>>>> Serviço iniciado na porta ${port}`)
    })

}

start()


