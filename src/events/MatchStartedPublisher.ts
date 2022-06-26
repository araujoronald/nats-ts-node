import { Publisher } from './BasePublisher'
import { MatchStartedEvent } from './MatchStartedEvent'
import { Subjects } from './subjects'

export class MatchStartedPublisher extends Publisher<MatchStartedEvent> {
  subject: Subjects.MatchStarted = Subjects.MatchStarted;
}
