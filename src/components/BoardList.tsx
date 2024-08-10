import React, { useEffect, useState } from 'react'
import { getBoards, deleteBoard } from '../services/BoardService'
import EditBoard from './EditBoard'

// Define the Board interface
interface Board {
  id: number
  name: string
}

// Define the props for the BoardList component
interface BoardListProps {
  refresh: boolean
}

const BoardList: React.FC<BoardListProps> = ({ refresh }) => {
  const [boards, setBoards] = useState<Board[]>([])
  const [editingBoardId, setEditingBoardId] = useState<number | null>(null)

  // Fetch boards when the component mounts and when refresh changes
  useEffect(() => {
    const fetchBoards = async () => {
      const response = await getBoards() // Call the API to get boards
      setBoards(response.data) // Update state with the fetched boards
    }

    fetchBoards()
  }, [refresh])

  // Handle deleting a board
  const handleDelete = async (id: number) => {
    await deleteBoard(id) // Call the API to delete the board
    setBoards(boards.filter((board) => board.id !== id)) // Remove the deleted board from state
  }

  // Set the editing board ID to the selected board's ID
  const handleEdit = (id: number) => {
    setEditingBoardId(id)
  }

  // Handle board update and refresh the list
  const handleBoardUpdated = () => {
    setEditingBoardId(null) // Reset the editing board ID
    // Fetch boards again to get updated data
    const fetchBoards = async () => {
      const response = await getBoards()
      setBoards(response.data)
    }

    fetchBoards()
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Boards</h1>
      {editingBoardId !== null ? (
        <EditBoard
          boardId={editingBoardId}
          onBoardUpdated={handleBoardUpdated}
          onCancel={() => setEditingBoardId(null)} // Reset the editing board ID on cancel
        />
      ) : (
        <ul>
          {boards.map((board) => (
            <li
              key={board.id}
              className='mb-2 p-2 border rounded flex justify-between items-center'
            >
              {board.name} {/* Display the name of the board */}
              <div>
                <button
                  onClick={() => handleEdit(board.id)} // Set the editing board ID
                  className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(board.id)} // Call the delete handler
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BoardList
