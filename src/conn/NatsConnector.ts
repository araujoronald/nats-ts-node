import { v4 as uuidv4 } from 'uuid'
import * as nc from 'nats'
import { JetStreamClient, NatsConnection, RetentionPolicy, StorageType } from 'nats'
import { Logger } from '../util/Logger'

class NatsConnector {

    private _natsConn?: NatsConnection
    private _jetstreamClient?: JetStreamClient

    get client() {
        if (!this._jetstreamClient) {
            throw new Error('Não é possível acessar o NATS antes de conectar o cliente jetstream')
        }
        return this._jetstreamClient
    }

    async connect(clientId: string, streamName: string, serverUrl: string): Promise<void> {

        clientId = `${clientId}-${uuidv4()}`

        this._natsConn = await nc.connect({
            name: clientId,
            servers: serverUrl
        })
        Logger.info('NATS connected.')

        const baseSubject = `${streamName}.*`
        const jsm = await this._natsConn.jetstreamManager()

        try {
            const streamExists = await jsm.streams.find(baseSubject)
            Logger.info(`NATS Stream [ ${streamName} ] already in use`)

        } catch (error) {
            await jsm.streams.add({
                name: streamName,
                subjects: [baseSubject],
                storage: StorageType.Memory,
                retention: RetentionPolicy.Interest,
                num_replicas: 1
            })
            Logger.info(`Subject [ ${baseSubject} ] added on stream [ ${streamName}]`)
        }

        this._jetstreamClient = this._natsConn.jetstream()
    }
}

export const natsConnector = new NatsConnector()