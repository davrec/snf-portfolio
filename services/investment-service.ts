import api from "./api"

export interface Investment {
  id?: string
  name: string
  symbol: string
  type: string
  price: number
  quantity: number
  value: number
  purchaseDate: string
}

export const getInvestments = async (): Promise<Investment[]> => {
  const response = await api.get("/investments")
  return response.data
}

export const getInvestment = async (id: string): Promise<Investment> => {
  const response = await api.get(`/investments/${id}`)
  return response.data
}

export const createInvestment = async (investment: Omit<Investment, "id">): Promise<Investment> => {
  const response = await api.post("/investments", investment)
  return response.data
}

export const updateInvestment = async (id: string, investment: Partial<Investment>): Promise<Investment> => {
  const response = await api.put(`/investments/${id}`, investment)
  return response.data
}

export const deleteInvestment = async (id: string): Promise<void> => {
  await api.delete(`/investments/${id}`)
}

