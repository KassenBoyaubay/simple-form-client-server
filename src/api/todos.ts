import apiClient from './http-common'
import { IToDo } from '../interfaces/interfaces'

export async function getTodos() {
    const { data } = await apiClient.get("/todos")
    return data
}

export async function updateToDo(postData: IToDo) {
    const response = await apiClient.put(`/todos/${postData.id}`, postData)
    return response
}

export async function postTodo(postData: IToDo['todo']) {
    const data = { todo: postData, completed: false }
    const response = await apiClient.post("/todos", data)
    return response
}

export async function deleteToDo(id: IToDo['id']) {
    const response = await apiClient.delete(`/todos/${id}`)
    return response
}