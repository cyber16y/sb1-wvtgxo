import React, { createContext, useContext, useState } from 'react'
import { User } from './UserContext'

interface Message {
  id: string
  content: string
  author: User
  timestamp: string
  channelId: string
}

interface MessageContextType {
  messages: Message[]
  addMessage: (message: Message) => void
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export const useMessage = () => {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider')
  }
  return context
}

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])

  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message])
  }

  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessageContext.Provider>
  )
}