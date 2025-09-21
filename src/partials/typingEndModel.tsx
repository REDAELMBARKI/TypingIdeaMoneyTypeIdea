// Add at the top of your file
import React from "react";

// GameOverModal component
const TypingOverModal: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Game Over!</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        You reached the end of the paragraph.<br />
        Try again or choose a new text!
      </p>
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={onReset}
      >
        Restart
      </button>
    </div>
  </div>
);


export default TypingOverModal;