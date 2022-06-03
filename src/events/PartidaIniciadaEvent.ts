import { Subjects } from "./Subjects"

export interface PartidaIniciadaEvent {
  subject: Subjects.PartidaIniciada
  data: {
    id: string
    mandante: string
    visitante: string
  }
}
