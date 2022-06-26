import { Subjects } from "./subjects"

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
