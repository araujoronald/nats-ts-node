import { JetStreamClient, JSONCodec, StringCodec } from 'nats'
import { Logger } from '../util/Logger'
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
    Logger.info(`Publish message on subject: ${this.subject}`)
    await this.client.publish(this.subject, this.jsonCodec.encode(data))
  }
}
