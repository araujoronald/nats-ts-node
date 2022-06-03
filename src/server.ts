import express from 'express'
import { principalRoutes } from './api/principal.routes'
import { natsWrapper } from './conn/NatsWrapper'
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

    const port = 3000
    app.listen(port, () => {
        console.log(`>>>> Serviço iniciado na porta ${port}`)
    })

}

start()


