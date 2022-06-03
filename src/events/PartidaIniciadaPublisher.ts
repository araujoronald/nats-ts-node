import { Publisher } from './BasePublisher'
import { PartidaIniciadaEvent } from './PartidaIniciadaEvent'
import { Subjects } from './Subjects'

export class PartidaIniciadaPublisher extends Publisher<PartidaIniciadaEvent> {
  subject: Subjects.PartidaIniciada = Subjects.PartidaIniciada;
}
