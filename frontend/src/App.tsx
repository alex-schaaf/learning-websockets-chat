import { useEffect, useState, useRef } from 'react'

import './App.css'

function App() {
  const [messages, setMessages] = useState<{message: string, timestamp: Date}[]>([])
  const [message, setMessage] = useState<string>('')
  const socket = useRef<WebSocket | null>(null)
  
  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8000/ws")

    socket.current.onmessage = (event) => {
      setMessages(messages => [{message: event.data, timestamp: new Date()}, ...messages])
    }

    return () => socket?.current?.close()
  }, [])



  return (
    <div className="p-8 space-y-4">
      <h1 className='font-bold text-4xl'>Chat</h1>
      
      <div className="border h-64 p-2">
        {messages.map(message => <div className='flex gap-2'>
          <div className="text-sm text-gray-500">{message.timestamp.toISOString()}</div>
          <div className="text-sm">{message.message}</div>
        </div>)}
      </div>
      <div className="space-x-4">
        <input className='border px-2 py-1' type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter message..." />
        <button className='bg-gray-500 text-white px-2 py-1 hover:bg-gray-600 hover:cursor-pointer' onClick={() => {
          if (!message) return
          socket?.current?.send(message)
          setMessage('')
        }}>Send message</button>
      </div>
    </div>
  )
}

export default App
