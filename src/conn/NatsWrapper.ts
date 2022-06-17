import { v4 as uuidv4 } from 'uuid'
import * as nc from 'nats'
import { AckPolicy, DeliverPolicy, JetStreamClient, JetStreamManager, NatsConnection, ReplayPolicy, RetentionPolicy, StorageType } from 'nats'

class NatsWrapper {

    private _natsConn?: NatsConnection
    private _jetstreamClient?: JetStreamClient
    private _jetstreamManager?: JetStreamManager
    private ackWait = 30000; // 30 segundos

    get client() {
        if (!this._jetstreamClient) {
            throw new Error('Não é possível acessar o NATS antes de conectar o cliente jetstream')
        }
        return this._jetstreamClient
    }

    // get jetstreamManager() {
    //     if (!this._jetstreamManager) {
    //         throw new Error('Não é possível obter o JetstreamManager')
    //     }
    //     return this._jetstreamManager
    // }

    async connect(clientId: string, streamName: string, serverUrl: string): Promise<void> {


        clientId = `${clientId}-${uuidv4()}`

        try {
            this._natsConn = await nc.connect({
                name: clientId,
                servers: serverUrl
            })
            console.log('NATS conectado.')

            const baseSubject = `${streamName}.*`
            const jsm = await this._natsConn.jetstreamManager()

            try {
                const streamExists = await jsm.streams.find(baseSubject)
                console.log(`NATS Stream ${streamName} em uso`)
            } catch (error) {
                await jsm.streams.add({
                    name: streamName,
                    subjects: [baseSubject],
                    storage: StorageType.Memory,
                    retention: RetentionPolicy.Interest,
                    num_replicas: 1
                })
                console.log(`NATS Stream ${streamName} adicionado no subject ${baseSubject} e em uso`)
            }

            // await jsm.consumers.add(streamName, {
            //     replay_policy: ReplayPolicy.Original,
            //     ack_policy: AckPolicy.Explicit,
            //     ack_wait: this.ackWait
            // })

            this._jetstreamClient = this._natsConn.jetstream()
            console.log(`NATS Jetstream client obtido`)

        } catch (error) {
            console.log(error)
            console.log('Erro ao conectar NATS.')
        }
    }
}

export const natsWrapper = new NatsWrapper()