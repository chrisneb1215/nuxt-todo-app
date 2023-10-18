export interface Task {
    id: number
    name: string
    /**
     * Represents the Task status
     */
    isDone: TaskStatus
}

export enum TaskStatus {
    PENDING = 0,
    DONE = 1,
}
