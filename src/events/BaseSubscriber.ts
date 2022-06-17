import { AckPolicy, JetStreamClient, ConsumerOptsBuilder, StringCodec, JsMsg, JSONCodec, createInbox } from 'nats'
import { consumerOpts, ConsumerOptsBuilderImpl } from 'nats/lib/nats-base-client/jsconsumeropts'
import { Subjects } from './Subjects'


interface Event {
  subject: Subjects
  data: any
}

export abstract class Subscriber<T extends Event> {
  abstract subject: T["subject"]
  abstract onMessage(data: T["data"], msg: JsMsg): void
  abstract queueName: string

  protected client: JetStreamClient
  protected ackWait = 30000; // 30 segundos

  constructor(client: JetStreamClient) {
    this.client = client
  }

  consumerOptions() {
    return new ConsumerOptsBuilderImpl()
      .queue(this.queueName)
      .durable(this.subject.replace('.', ''))
      .manualAck()
      .ackExplicit()
      .ackWait(this.ackWait)
      .deliverTo(createInbox())
  }

  async listen() {
    console.log('iniciando subscriber')
    const subscription = await this.client.subscribe(this.subject, this.consumerOptions())
    console.log('subscriber adicionado')

    const sc = StringCodec()
    const jsonCodec = JSONCodec();

    (async () => {
      for await (const m of subscription) {
        this.onMessage(jsonCodec.decode(m.data), m)
      }
    })()
  }
}
