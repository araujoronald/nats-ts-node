import { Publisher } from './BasePublisher'
import { MatchStartedEvent } from './MatchStartedEvent'
import { Subjects } from './Subjects'

export class MatchStartedPublisher extends Publisher<MatchStartedEvent> {
  subject: Subjects.MatchStarted = Subjects.MatchStarted;
}
