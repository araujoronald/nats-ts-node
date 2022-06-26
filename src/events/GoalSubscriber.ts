import { JsMsg } from 'nats'
import { Subscriber } from './BaseSubscriber'
import { GoalEvent } from './GoalEvent'
import { Subjects } from './subjects'
import { queueName } from "./queue"
import { Logger } from '../util/logger'

export class GoalSubscriber extends Subscriber<GoalEvent> {
  queueName = queueName;
  subject: Subjects.Goal = Subjects.Goal;


  async onMessage(data: GoalEvent["data"], msg: JsMsg) {
    msg.working()
    Logger.info(`[Goal Subscriber] Message received: ${JSON.stringify(data)}`)
    msg.ack()
  }
}
