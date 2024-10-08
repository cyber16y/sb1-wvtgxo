import React from 'react'
import { X, Edit2 } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

interface UserProfileProps {
  onClose: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { currentUser, updateUser } = useUser()

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUser({ ...currentUser, status: e.target.value })
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-full mx-auto" />
            <button className="absolute bottom-0 right-1/3 bg-blue-500 text-white p-1 rounded-full">
              <Edit2 size={16} />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={currentUser.name}
              onChange={(e) => updateUser({ ...currentUser, name: e.target.value })}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={currentUser.status}
              onChange={handleStatusChange}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="online">Online</option>
              <option value="idle">Idle</option>
              <option value="dnd">Do Not Disturb</option>
              <option value="invisible">Invisible</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">About Me</label>
            <textarea
              value={currentUser.aboutMe}
              onChange={(e) => updateUser({ ...currentUser, aboutMe: e.target.value })}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile