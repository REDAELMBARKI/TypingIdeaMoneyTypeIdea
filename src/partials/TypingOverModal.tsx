// Add at the top of your file
import React from "react";

interface typingOverModalProps {
  handleReset : () => void ;
  nextText : () => void ;
}
// GameOverModal component
const TypingOverModal = ({ handleReset , nextText }:typingOverModalProps) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Game Over!</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        You reached the end of the paragraph.<br />
        Try again or choose a new text!
      </p>
       <div className="flex gap-2 flex justify-center">
              <button
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={handleReset}
            >
              reset
            </button>
            <button 
             
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={nextText}
            >
              next
            </button>
       </div>
    </div>
  </div>
);


export default TypingOverModal;