import api from "./api"

export interface User {
  id: string
  name: string
  email: string
  profilePicture?: string
}

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/users/me")
  return response.data
}

export const updateCurrentUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.put("/users/me", userData)
  return response.data
}

