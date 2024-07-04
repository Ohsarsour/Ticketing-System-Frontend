import React, { useState } from 'react'
import { createBoard } from '../services/BoardService'

// Define the props for the AddBoard component
interface AddBoardProps {
  onBoardAdded: () => void // Function to call when a board is added
}

const AddBoard: React.FC<AddBoardProps> = ({ onBoardAdded }) => {
  // State to hold the name of the new board
  const [name, setName] = useState('')

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission behavior
    if (name.trim()) {
      // Check if the board name is not empty
      await createBoard({ name }) // Call the API to create a new board
      setName('') // Reset the input field
      onBoardAdded() // Trigger the parent component's refresh function
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-xl font-bold mb-4'>Add New Board</h2>
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
          Add Board
        </button>
      </form>
    </div>
  )
}

export default AddBoard
