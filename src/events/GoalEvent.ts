import { Subjects } from "./subjects"

export interface GoalEvent {
  subject: Subjects.Goal
  data: {
    id: string
    time: Date
  }
}
