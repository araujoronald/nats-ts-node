import { Router } from 'express'
import { natsWrapper } from '../conn/NatsWrapper'
import { PartidaIniciadaPublisher } from '../events/PartidaIniciadaPublisher'

const router = Router()

router.get('/', (request, response) => {
    response.json({ message: 'Olá Mundo Saude!' })
})

router.get('/partida-iniciada', async (request, response) => {
    const publisher = new PartidaIniciadaPublisher(natsWrapper.client)
    await publisher.publish({
        id: 'Partida 1',
        mandante: 'Bahia',
        visitante: 'Real Madrid'
    })
    response.json({ message: 'Mensagem publicada' })

})

export { router as principalRoutes }