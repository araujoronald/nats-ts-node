import { Publisher } from './BasePublisher'
import { GoalEvent } from './GoalEvent'
import { Subjects } from './subjects'

export class GoalPublisher extends Publisher<GoalEvent> {
  subject: Subjects.Goal = Subjects.Goal;
}
