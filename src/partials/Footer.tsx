import React from 'react'

function Footer({isDarkMode}: {isDarkMode: boolean}) {
  return (
     <footer className={`text-center py-6 ${
        isDarkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>
        <p className="text-sm">
          Click anywhere to start typing • Press Tab + Enter to reset
        </p>
      </footer>
  )
}

export default Footer