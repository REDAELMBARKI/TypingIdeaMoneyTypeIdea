import React, { type JSX } from "react";

interface ModalProps {
  setIsRecordPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRecordActive: React.Dispatch<React.SetStateAction<boolean>>;
  replayRenderedText: JSX.Element[]; // your rendered typing session
  containerRef: React.RefObject<HTMLDivElement  | null>;
}

export const RecordedTypeSession: React.FC<ModalProps> = ({
  setIsRecordPanelOpen,
  setIsRecordActive,
  replayRenderedText,
  containerRef
}) => {

  const handleClose = () => {
    
    setIsRecordPanelOpen(false);
    
  };


  const handlePlay = () => {
  
    setIsRecordActive(true);
  };

  
 
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
      style={{ animation: "fadeIn 0.3s ease" }}
      // click outside does NOT close modal anymore
    >
      <div
        className="relative w-11/12 md:w-4/5 lg:w-3/4 h-[50%] bg-black/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 p-6 overflow-hidden flex flex-col justify-between"
        // prevent closing when clicking inside modal
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing background effect */}
        <div className="absolute inset-0  opacity-20 blur-3xl rounded-2xl pointer-events-none"></div>

        {/* Modal content */}
        <div ref={containerRef} className="relative z-10 text-white flex-1 flex items-center justify-center">
          {replayRenderedText}
        </div>

        {/* Next / Action buttons */}
        <div className="relative z-10 flex justify-center gap-6 mt-4">
          <button
            onClick={handlePlay}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold transition-colors"
          >
            Watch
          </button>
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
