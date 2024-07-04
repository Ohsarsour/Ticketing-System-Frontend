import React, { useState } from 'react'
import './App.css'
import BoardList from './components/BoardList'
import AddBoard from './components/AddBoard'

function App() {
  // State to trigger refresh of the board list
  const [refresh, setRefresh] = useState(false)

  // Function to toggle the refresh state
  const triggerRefresh = () => {
    setRefresh(!refresh)
  }

  return (
    <div className='App'>
      <AddBoard onBoardAdded={triggerRefresh} />{' '}
      {/* Pass the refresh function to AddBoard */}
      <BoardList refresh={refresh} />{' '}
      {/* Pass the refresh state to BoardList */}
    </div>
  )
}

export default App
