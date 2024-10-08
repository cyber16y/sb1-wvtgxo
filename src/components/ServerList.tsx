import React from 'react'
import { Plus, Compass } from 'lucide-react'
import { useServer } from '../contexts/ServerContext'

interface ServerListProps {
  openModal: (content: React.ReactNode) => void
}

const ServerList: React.FC<ServerListProps> = ({ openModal }) => {
  const { servers, activeServer, setActiveServer } = useServer()

  const handleAddServer = () => {
    openModal(
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Add New Server</h2>
        <input
          type="text"
          placeholder="Server Name"
          className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
        <input
          type="text"
          placeholder="Server Icon URL"
          className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Create Server
        </button>
      </div>
    )
  }

  const handleExploreServers = () => {
    openModal(
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Explore Servers</h2>
        <ul className="space-y-2">
          <li className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">Gaming Community</li>
          <li className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">Art & Design</li>
          <li className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">Music Lovers</li>
          <li className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">Tech & Programming</li>
        </ul>
      </div>
    )
  }

  return (
    <div className="w-20 bg-gray-300 dark:bg-gray-900 flex flex-col items-center py-4 space-y-4">
      {servers.map(server => (
        <div
          key={server.id}
          className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
            activeServer.id === server.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-400 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600'
          }`}
          onClick={() => setActiveServer(server)}
        >
          {server.icon ? (
            <img src={server.icon} alt={server.name} className="w-full h-full rounded-full" />
          ) : (
            <span className="text-lg font-bold">{server.name[0].toUpperCase()}</span>
          )}
        </div>
      ))}
      <div
        className="w-12 h-12 rounded-full bg-gray-400 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600 flex items-center justify-center cursor-pointer"
        onClick={handleAddServer}
      >
        <Plus size={24} />
      </div>
      <div
        className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center cursor-pointer"
        onClick={handleExploreServers}
      >
        <Compass size={24} />
      </div>
    </div>
  )
}

export default ServerList