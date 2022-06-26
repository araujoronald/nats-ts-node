import { Subjects } from "./Subjects"

export interface MatchStartedEvent {
  subject: Subjects.MatchStarted
  data: {
    id: string
    home: string
    away: string
    stadium: string
    time: Date
  }
}
