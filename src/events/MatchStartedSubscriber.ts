import { JsMsg } from 'nats'
import { Subscriber } from './BaseSubscriber'
import { MatchStartedEvent } from './MatchStartedEvent'
import { Subjects } from './subjects'
import { queueName } from "./queue"
import { Logger } from '../util/logger'

export class MatchStartedSubscriber extends Subscriber<MatchStartedEvent> {
  queueName = queueName;
  subject: Subjects.MatchStarted = Subjects.MatchStarted;

  async onMessage(data: MatchStartedEvent["data"], msg: JsMsg) {
    msg.working()
    Logger.info(`[MatchStarted Subscriber] Message received: ${JSON.stringify(data)}`)
    msg.ack()
  }
}
