// Add at the top of your file
import React from "react";
import type { globalStatetype, WordHistoryItem } from "../types/experementTyping";

interface typingOverModalProps {
  handleReset : () => void ;
  nextText : () => void ;
   wpmFinal: number ; 
   setIsRecordPanelOpen : React.Dispatch<React.SetStateAction<boolean>> ;
    globalState: globalStatetype ;
    setGlobalState: React.Dispatch<React.SetStateAction<globalStatetype>>
    wordHistoryCopyRef: React.RefObject<WordHistoryItem[]>
}
// GameOverModal component
const TypingOverModal = ({wordHistoryCopyRef , wpmFinal ,globalState  , setGlobalState,  handleReset , nextText  , setIsRecordPanelOpen }:typingOverModalProps) => {
   wordHistoryCopyRef.current = [...globalState.wordHistory] ;

  const handleReplayRecordedSession = () => {
        setGlobalState({
            wrongChars: [] ,
            wrongWords: [] ,
            wordHistory: []
        })
        setIsRecordPanelOpen(true);
  
  }


 
       return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Game Over!</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              You reached the end of the paragraph.<br />
              Try again or choose a new text!
            </p>
            <div>
              wpm {wpmFinal}
            </div>
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

                  <button
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    onClick={handleReplayRecordedSession}
                  >
                    Record Session
                  </button>
            </div>
          </div>
        </div>
       )
};


export default React.memo(TypingOverModal);