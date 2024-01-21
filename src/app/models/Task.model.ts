export interface Task {
    "id": string,
    "title": string,
    "description": String,
    "dueDate": Date,
    "status": Status,
}

export enum Status {
    Completed = 'Completed',
    InComplete = 'InComplete',
}