import React, { createContext, useContext, useState } from 'react'

export interface User {
  id: string
  name: string
  avatar: string
  status: 'online' | 'idle' | 'dnd' | 'invisible'
  aboutMe: string
}

interface UserContextType {
  currentUser: User
  updateUser: (user: User) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    avatar: 'https://source.unsplash.com/100x100/?portrait',
    status: 'online',
    aboutMe: 'I love coding and chatting!',
  })

  const updateUser = (user: User) => {
    setCurrentUser(user)
  }

  return (
    <UserContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}