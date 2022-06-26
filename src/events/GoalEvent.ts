import { Subjects } from "./Subjects"

export interface GoalEvent {
  subject: Subjects.Goal
  data: {
    id: string
    time: Date
  }
}
