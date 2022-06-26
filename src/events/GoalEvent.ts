import { Subjects } from "./subjects"

export interface GoalEvent {
  subject: Subjects.Goal
  data: {
    id: string
    time: Date
    status: GoalStatus
  }
}

export enum GoalStatus {
  Valid = 'valid',
  Offside = 'offside',
  CheckingVAR = 'checkingVar'
}
