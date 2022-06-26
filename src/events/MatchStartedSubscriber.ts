import { JsMsg } from 'nats'
import { Subscriber } from './BaseSubscriber'
import { MatchStartedEvent } from './MatchStartedEvent'
import { Subjects } from './Subjects'
import { queueName } from "./Queue"
import { Logger } from '../util/Logger'

export class MatchStartedSubscriber extends Subscriber<MatchStartedEvent> {
  queueName = queueName;
  subject: Subjects.MatchStarted = Subjects.MatchStarted;

  async onMessage(data: MatchStartedEvent["data"], msg: JsMsg) {
    msg.working()
    Logger.info(`[MatchStarted Subscriber] Message received: ${JSON.stringify(data)}`)
    msg.ack()
  }
}
