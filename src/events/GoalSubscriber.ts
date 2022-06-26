import { JsMsg } from 'nats'
import { Subscriber } from './BaseSubscriber'
import { GoalEvent } from './GoalEvent'
import { Subjects } from './Subjects'
import { queueName } from "./Queue"
import { Logger } from '../util/Logger'

export class GoalSubscriber extends Subscriber<GoalEvent> {
  queueName = queueName;
  subject: Subjects.Goal = Subjects.Goal;


  async onMessage(data: GoalEvent["data"], msg: JsMsg) {
    msg.working()
    Logger.info(`[Goal Subscriber] Message received: ${JSON.stringify(data)}`)
    msg.ack()
  }
}
