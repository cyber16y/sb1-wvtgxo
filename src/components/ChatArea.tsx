import React, { useState, useEffect, useRef } from 'react'
import { Send, Smile, Paperclip, MoreVertical } from 'lucide-react'
import { useMessage } from '../contexts/MessageContext'
import { useUser } from '../contexts/UserContext'
import EmojiPicker from './EmojiPicker'

interface ChatAreaProps {
  channelName: string
  openModal: (content: React.ReactNode) => void
}

const ChatArea: React.FC<ChatAreaProps> = ({ channelName, openModal }) => {
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const { messages, addMessage } = useMessage()
  const { currentUser } = useUser()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      addMessage({
        id: Date.now().toString(),
        content: message,
        author: currentUser,
        timestamp: new Date().toISOString(),
        channelId: channelName,
      })
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prevMessage => prevMessage + emoji)
    setShowEmojiPicker(false)
  }

  const handleMoreOptions = () => {
    openModal(
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Channel Options</h2>
        <ul className="space-y-2">
          <li className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">Invite People</li>
          <li className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">Channel Settings</li>
          <li className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">Create Thread</li>
        </ul>
      </div>
    )
  }

  return (
    <div className="flex-grow flex flex-col bg-white dark:bg-gray-800">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-2xl font-bold">#{channelName}</h2>
        <button onClick={handleMoreOptions} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <MoreVertical size={24} />
        </button>
      </div>
      <div className="flex-grow p-6 overflow-y-auto scrollbar-thin">
        <div className="space-y-4">
          {messages
            .filter(msg => msg.channelId === channelName)
            .map(msg => (
              <div key={msg.id} className="flex items-start space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded">
                <img src={msg.author.avatar} alt={msg.author.name} className="w-10 h-10 rounded-full" />
                <div className="flex-grow">
                  <div className="flex items-baseline">
                    <span className="font-bold mr-2">{msg.author.name}</span>
                    <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="mt-1">{msg.content}</p>
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-gray-200 dark:bg-gray-800">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message #${channelName}`}
            className="w-full p-2 pr-24 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            rows={2}
          />
          <div className="absolute right-2 bottom-2 flex space-x-2">
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <Smile size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <Paperclip size={20} />
            </button>
            <button onClick={handleSendMessage} className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
      {showEmojiPicker && (
        <EmojiPicker onEmojiSelect={handleEmojiSelect} />
      )}
    </div>
  )
}

export default ChatArea