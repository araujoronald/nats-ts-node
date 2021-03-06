import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { natsConnector } from '../conn/NatsConnector'
import { GoalStatus } from '../events/GoalEvent'
import { GoalPublisher } from '../events/GoalPublisher'
import { MatchStartedPublisher } from '../events/MatchStartedPublisher'
import { Stadiums, Teams } from '../util/assets'

const router = Router()

router.get('/', (request, response) => {
    response.json({ message: 'Olá Mundo Saude!' })
})

router.get('/match-started', async (request, response) => {
    const publisher = new MatchStartedPublisher(natsConnector.client)
    const message = {
        id: 'Match: ' + uuidv4(),
        home: Teams.sample(),
        away: Teams.sample(),
        stadium: Stadiums.sample(),
        time: new Date()

    }
    await publisher.publish(message)
    response.json({ message: `Message published on subject [ football.match:started ]: ${JSON.stringify(message)}` })
})

router.get('/goal', async (request, response) => {
    const publisher = new GoalPublisher(natsConnector.client)
    const message = {
        id: uuidv4(),
        time: new Date(),
        status: GoalStatus.Valid
    }
    await publisher.publish(message)
    response.json({ message: `Message published on subject [ football.goal ]: ${JSON.stringify(message)}` })
})

router.get('/goal-offside', async (request, response) => {
    const publisher = new GoalPublisher(natsConnector.client)
    const message = {
        id: uuidv4(),
        time: new Date(),
        status: GoalStatus.Offside
    }
    await publisher.publish(message)
    response.json({ message: `Message published on subject [ football.goal ]: ${JSON.stringify(message)}` })
})

router.get('/goal-checking-var', async (request, response) => {
    const publisher = new GoalPublisher(natsConnector.client)
    const message = {
        id: uuidv4(),
        time: new Date(),
        status: GoalStatus.CheckingVAR
    }
    await publisher.publish(message)
    response.json({ message: `Message published on subject [ football.goal ]: ${JSON.stringify(message)}` })
})

export { router as principalRoutes }