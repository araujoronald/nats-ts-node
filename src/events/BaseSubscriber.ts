import { AckPolicy, JetStreamClient, ConsumerOptsBuilder, StringCodec, JsMsg, JSONCodec, createInbox } from 'nats'
import { consumerOpts, ConsumerOptsBuilderImpl } from 'nats/lib/nats-base-client/jsconsumeropts'
import { Logger } from '../util/Logger'
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
  protected ackWait = 30000; // 30 seconds

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
    const subscription = await this.client.subscribe(this.subject, this.consumerOptions())
    Logger.info(`subscriber added to subject: [ ${this.subject} ]`)

    const sc = StringCodec()
    const jsonCodec = JSONCodec();

    (async () => {
      for await (const m of subscription) {
        this.onMessage(jsonCodec.decode(m.data), m)
      }
    })()
  }
}
