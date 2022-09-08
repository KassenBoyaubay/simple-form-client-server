import apiClient from './http-common'
import { IFormInput } from '../interfaces/dashboard'

export async function submitDashboard(postData: IFormInput) {
    if (postData.password !== postData.confirmPassword) { throw new Error('Passwords don\'t match') }
    const { confirmPassword, haveEmail, ...data } = postData
    const response = await apiClient.post("/dashboard", data)
    return response
}

export async function deleteDashboard(id: number) {
    const response = await apiClient.delete(`/dashboard/${id}`)
    return response
}

