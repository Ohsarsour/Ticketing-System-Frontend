//This service handles API calls related to the Board model.
import axios from 'axios'

// Base URL for the API
const API_URL = 'http://localhost:5074/api/boards'

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000, // 5 seconds timeout
})

// Function to get all boards
export const getBoards = async () => {
  return await axiosInstance.get(API_URL)
}

// Function to get a specific board by ID
export const getBoard = async (id: number) => {
  return await axiosInstance.get(`${API_URL}/${id}`)
}

// Function to create a new board
export const createBoard = async (board: { name: string }) => {
  return await axiosInstance.post(API_URL, board)
}

// Function to update an existing board
export const updateBoard = async (
  id: number,
  board: { id: number; name: string }
) => {
  return await axiosInstance.put(`/${id}`, board)
}

// Function to delete a board
export const deleteBoard = async (id: number) => {
  return await axiosInstance.delete(`${API_URL}/${id}`)
}
