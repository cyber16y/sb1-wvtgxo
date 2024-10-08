import React from 'react'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const emojis = ['😀', '😂', '😍', '🤔', '😎', '👍', '❤️', '🎉', '🔥', '🌈']

  return (
    <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2">
      <div className="grid grid-cols-5 gap-2">
        {emojis.map(emoji => (
          <button
            key={emoji}
            onClick={() => onEmojiSelect(emoji)}
            className="text-2xl hover:bg-gray-200 dark:hover:bg-gray-600 rounded p-1"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}

export default EmojiPicker