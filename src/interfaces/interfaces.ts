export interface IToDo {
    todo: string,
    completed: boolean,
    id: number
}

export interface IToDos extends Array<IToDo> { }