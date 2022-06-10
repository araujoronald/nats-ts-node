import { Subjects } from "./Subjects"

export interface GolEvent {
  subject: Subjects.Gol
  data: {
    id: string
    jogador: string
    tempo: string
    mandante: boolean
  }
}
