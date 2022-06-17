import { JetStreamClient, JSONCodec, StringCodec } from 'nats'
import { Subjects } from "./Subjects"

interface Event {
  subject: Subjects
  data: any
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"]
  protected client: JetStreamClient
  protected sc = StringCodec();
  protected jsonCodec = JSONCodec();

  constructor(client: JetStreamClient) {
    this.client = client
  }

  async publish(data: T["data"]): Promise<void> {
    console.log('PUBLISHER subject: ', this.subject)
    // await this.client.publish(this.subject, this.sc.encode(JSON.stringify(data)))
    await this.client.publish(this.subject, this.jsonCodec.encode(data))
  }
}
