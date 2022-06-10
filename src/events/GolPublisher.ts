import { Publisher } from './BasePublisher'
import { GolEvent } from './GolEvent'
import { Subjects } from './Subjects'

export class GolPublisher extends Publisher<GolEvent> {
  subject: Subjects.Gol = Subjects.Gol;
}
