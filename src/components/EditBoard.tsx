import React, { useState, useEffect } from 'react'
import { updateBoard, getBoard } from '../services/BoardService'

// Define the props for the EditBoard component
interface EditBoardProps {
  boardId: number
  onBoardUpdated: () => void
  onCancel: () => void
}

const EditBoard: React.FC<EditBoardProps> = ({
  boardId,
  onBoardUpdated,
  onCancel,
}) => {
  const [name, setName] = useState('')

  // Fetch the board details when the component mounts or boardId changes
  useEffect(() => {
    const fetchBoard = async () => {
      const response = await getBoard(boardId)
      setName(response.data.name) // Set the name state with the fetched board name
    }

    fetchBoard()
  }, [boardId])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      try {
        console.log('Updating board with ID:', boardId, 'and name:', name)
        await updateBoard(boardId, { id: boardId, name })
        onBoardUpdated()
      } catch (error) {
        console.error('Failed to update board:', error)
      }
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-xl font-bold mb-4'>Edit Board</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Board Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)} // Update state on input change
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Update Board
        </button>
        <button
          type='button'
          onClick={onCancel} // Call the onCancel function when the button is clicked
          className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2'
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default EditBoard
