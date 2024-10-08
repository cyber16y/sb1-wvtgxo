import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import UserProfile from './components/UserProfile'
import ServerList from './components/ServerList'
import { ThemeProvider } from './contexts/ThemeContext'
import { MessageProvider } from './contexts/MessageContext'
import { UserProvider } from './contexts/UserContext'
import { ServerProvider } from './contexts/ServerContext'
import Modal from './components/Modal'

function App() {
  const [activeChannel, setActiveChannel] = useState('general')
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)

  const openModal = (content: React.ReactNode) => {
    setModalContent(content)
    setShowModal(true)
  }

  return (
    <ThemeProvider>
      <UserProvider>
        <ServerProvider>
          <MessageProvider>
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <ServerList openModal={openModal} />
              <Sidebar
                activeChannel={activeChannel}
                setActiveChannel={setActiveChannel}
                setShowUserProfile={setShowUserProfile}
                openModal={openModal}
              />
              <ChatArea channelName={activeChannel} openModal={openModal} />
              {showUserProfile && (
                <UserProfile onClose={() => setShowUserProfile(false)} />
              )}
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  {modalContent}
                </Modal>
              )}
            </div>
          </MessageProvider>
        </ServerProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App