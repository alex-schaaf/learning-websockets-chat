import { useEffect, useState, useRef } from 'react'

import './App.css'

function App() {
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState<string>('')
  const socket = useRef<WebSocket | null>(null)
  
  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8000/ws")

    socket.current.onmessage = (event) => {
      setMessages(messages => [event.data, ...messages])
    }

    return () => socket?.current?.close()
  }, [])



  return (
    <div className="App">
      <h1>Chat</h1>
      
      <div className="card">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter message..." />
        <button onClick={() => {
          if (!message) return
          socket?.current?.send(message)
          setMessage('')
        }}>Send message</button>
      </div>
      <div className="card">
        {messages.map(message => <div>{message}</div>)}
      </div>
    </div>
  )
}

export default App
