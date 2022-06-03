import { AckPolicy, JetStreamClient, ConsumerOptsBuilder, StringCodec, JsMsg } from 'nats'
import { ConsumerOptsBuilderImpl } from 'nats/lib/nats-base-client/jsconsumeropts'
import { Subjects } from './Subjects'


interface Event {
  subject: Subjects
  data: any
}

export abstract class Subscriber<T extends Event> {
  abstract subject: T["subject"]
  abstract queueGroupName: string
  abstract onMessage(data: T["data"], msg: JsMsg): void

  protected client: JetStreamClient
  protected ackWait = 30000; // 30 segundos

  constructor(client: JetStreamClient) {
    this.client = client
  }

  subscriptionOptions() {
    return new ConsumerOptsBuilderImpl()
      .deliverAll()
      .manualAck()
      .ackWait(this.ackWait)
      .durable(this.queueGroupName)
    // .deliverTo('futebol')
  }


  async listen() {
    const subscription = await this.client.subscribe(this.subject, this.subscriptionOptions())
    const sc = StringCodec();

    (async () => {
      for await (const m of subscription) {
        // console.log(`[${subscription.getProcessed()}]: ${sc.decode(m.data)}`)
        this.onMessage(sc.decode(m.data), m)
      }
    })()
  }
}
