import { JsMsg } from 'nats'
import { Subscriber } from './BaseSubscriber'
import { GoalEvent, GoalStatus } from './GoalEvent'
import { Subjects } from './subjects'
import { queueName } from "./queue"
import { Logger } from '../util/logger'

export class GoalSubscriber extends Subscriber<GoalEvent> {
  queueName = queueName;
  subject: Subjects.Goal = Subjects.Goal;


  async onMessage(data: GoalEvent["data"], msg: JsMsg) {
    msg.working()
    Logger.info(`[Goal Subscriber] Message received: ${JSON.stringify(data)}`)
    if (data.status == GoalStatus.CheckingVAR) {
      setTimeout(() => {
        Logger.info('Nats Timeout. The message will be sent again')
      }, 4000)
    } else if (data.status == GoalStatus.Offside) {
      const errorMessage = 'Offside is detected. Goal was invalidated'
      Logger.error(errorMessage)
      msg.term()
      throw Error(errorMessage)
    } else {
      msg.ack()
    }
  }
}
