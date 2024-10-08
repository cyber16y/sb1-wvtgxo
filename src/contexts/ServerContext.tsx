import React, { createContext, useContext, useState } from 'react'

interface Server {
  id: string
  name: string
  icon?: string
}

interface ServerContextType {
  servers: Server[]
  activeServer: Server
  setActiveServer: (server: Server) => void
}

const ServerContext = createContext<ServerContextType | undefined>(undefined)

export const useServer = () => {
  const context = useContext(ServerContext)
  if (!context) {
    throw new Error('useServer must be used within a ServerProvider')
  }
  return context
}

export const ServerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [servers] = useState<Server[]>([
    { id: '1', name: 'General', icon: 'https://source.unsplash.com/50x50/?logo' },
    { id: '2', name: 'Gaming', icon: 'https://source.unsplash.com/50x50/?game' },
    { id: '3', name: 'Coding', icon: 'https://source.unsplash.com/50x50/?code' },
  ])
  const [activeServer, setActiveServer] = useState<Server>(servers[0])

  return (
    <ServerContext.Provider value={{ servers, activeServer, setActiveServer }}>
      {children}
    </ServerContext.Provider>
  )
}