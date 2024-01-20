export interface Task {
    "id": Number,
    "title": string,
    "description": String,
    "dueDate": Date,
    "status": Status,
}

export enum Status {
    Completed = 'Completed',
    InComplete = 'InComplete',
}