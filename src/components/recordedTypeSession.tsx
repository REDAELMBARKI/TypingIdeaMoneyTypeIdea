import React, { useEffect } from "react";
import useReplayDataContext from "../contextHooks/useReplayDataContext";
import useContainerAndFontContext from "../contextHooks/useContainerAndFontContext";



export const RecordedTypeSession = () => {

  const {setIsRecordActive , setIsRecordPanelOpen } = useReplayDataContext();
  const {containerRef  , fontSizeRef}  = useContainerAndFontContext();
  const {replayRenderedTextRef} = useReplayDataContext();
  const handleClose = () => {
    
    setIsRecordPanelOpen(false);
    
  };


  const handlePlay = () => {
  
    setIsRecordActive(true);
  };
  
  useEffect(() => {
    console.log(containerRef.current?.querySelectorAll('span'))
  }, []);


  //  reducing font size to fit content within container
  useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  let currentFontSize = fontSizeRef.current;

  while (container.scrollHeight > container.clientHeight && currentFontSize > 8) {
    currentFontSize -= 5;
    container.style.fontSize = `${currentFontSize}px`;
  }
}, []);
 
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
        <div 
           ref={containerRef} 
           style={{
            textAlign: "start",
            fontSize: `${36}px`,
            overflow: "hidden",
            whiteSpace: "normal",           // allow wrapping
            wordWrap: "break-word",         // break long words if needed
            overflowWrap: "break-word",     // modern equivalent
          }}
          className="relative z-10 text-white ">
          {replayRenderedTextRef.current ?? 'not txt '}
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
