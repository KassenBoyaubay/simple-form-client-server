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