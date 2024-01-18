import { useState } from 'react'
import './App.css'
import Chat from './components/Chat/Chat'
import Join from './components/Join/Join'

function App() {
  const [chatVisible, chatSet] = useState(false);
  const [socket, setSocket] = useState(null)

  return (
    <>
      {chatVisible ?
        <Chat socket={socket} /> : <Join chatSet={chatSet} setSocket={setSocket}/>
      }
    </>
  )
}

export default App
