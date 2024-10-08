import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import { User, Settings, Users, Hash, Volume2, PhoneCall, Plus } from 'lucide-react'
import { useServer } from '../contexts/ServerContext'
import { useUser } from '../contexts/UserContext'

interface SidebarProps {
  activeChannel: string
  setActiveChannel: (channel: string) => void
  setShowUserProfile: (show: boolean) => void
  openModal: (content: React.ReactNode) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeChannel, setActiveChannel, setShowUserProfile, openModal }) => {
  const { activeServer } = useServer()
  const { currentUser } = useUser()

  const channels = [
    { id: 'general', name: 'General', icon: <Hash size={20} /> },
    { id: 'random', name: 'Random', icon: <Hash size={20} /> },
    { id: 'voice', name: 'Voice Channel', icon: <Volume2 size={20} /> },
  ]

  const menuOptions = [
    { id: 'friends', name: 'Friends', icon: <Users size={20} /> },
    { id: 'settings', name: 'Settings', icon: <Settings size={20} /> },
  ]

  const handleAddChannel = () => {
    openModal(
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Add New Channel</h2>
        <input
          type="text"
          placeholder="Channel Name"
          className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Create Channel
        </button>
      </div>
    )
  }

  return (
    <div className="w-64 bg-gray-200 dark:bg-gray-800 flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-xl font-bold">{activeServer.name}</h1>
        <ThemeSwitcher />
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold uppercase">Text Channels</h2>
            <button onClick={handleAddChannel} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <Plus size={16} />
            </button>
          </div>
          {channels.filter(c => c.id !== 'voice').map((channel) => (
            <div
              key={channel.id}
              className={`flex items-center p-2 rounded cursor-pointer ${
                activeChannel === channel.id ? 'bg-gray-300 dark:bg-gray-700' : 'hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveChannel(channel.id)}
            >
              {channel.icon}
              <span className="ml-2">{channel.name}</span>
            </div>
          ))}
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold mb-2 uppercase">Voice Channels</h2>
          {channels.filter(c => c.id === 'voice').map((channel) => (
            <div
              key={channel.id}
              className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              {channel.icon}
              <span className="ml-2">{channel.name}</span>
            </div>
          ))}
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold mb-2 uppercase">Menu</h2>
          {menuOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              {option.icon}
              <span className="ml-2">{option.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <div className="flex items-center cursor-pointer" onClick={() => setShowUserProfile(true)}>
          <div className="relative">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full" />
            <div className={`status-dot ${currentUser.status}`}></div>
          </div>
          <span className="ml-2 font-semibold">{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar