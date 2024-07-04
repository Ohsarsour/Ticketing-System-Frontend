import React, { useEffect, useState } from 'react'
import { getBoards } from '../services/BoardService'

// Define the props for the BoardList component
interface BoardListProps {
  refresh: boolean // Boolean to trigger refresh of the board list
}
const BoardList: React.FC<BoardListProps> = ({ refresh }) => {
  const [boards, setBoards] = useState<any[]>([])

  // Fetch boards when the component mounts
  useEffect(() => {
    const fetchBoards = async () => {
      const response = await getBoards()
      setBoards(response.data)
    }

    fetchBoards()
  }, [refresh]) // Re-fetch boards when refresh changes

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Boards</h1>
      <ul>
        {boards.map((board) => (
          <li key={board.id} className='mb-2 p-2 border rounded'>
            {board.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BoardList
