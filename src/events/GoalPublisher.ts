import { Publisher } from './BasePublisher'
import { GoalEvent } from './GoalEvent'
import { Subjects } from './Subjects'

export class GoalPublisher extends Publisher<GoalEvent> {
  subject: Subjects.Goal = Subjects.Goal;
}
