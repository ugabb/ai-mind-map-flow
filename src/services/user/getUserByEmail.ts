import { api } from '../axios'

export async function getUserByEmail(email: string) {
  try {
    const { data } = await api.get(`/user/${email}`)
    return data
  } catch (_err) {
    return null
  }
}
