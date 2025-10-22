import { useEffect } from "react";

interface typingWatcherProps{
    setIsTypingActive : React.Dispatch<React.SetStateAction<boolean>>
    isFocuceOnText : boolean
    setIsFocuceOnText :React.Dispatch<React.SetStateAction<boolean>>
}

const useTypingWatcher = ({setIsTypingActive ,isFocuceOnText, setIsFocuceOnText}:typingWatcherProps) => {
   useEffect(()=>{
      // watches if typing isactive or not 
      const handleKeyDown = () => { 
                       setIsTypingActive(true)
                       if(! isFocuceOnText) setIsFocuceOnText(true)
                     } ;
      
      const handleKeyUp = () => setIsTypingActive(false) ;
      
      window.addEventListener('keydown' ,handleKeyDown)
      window.addEventListener('keyup' ,handleKeyUp)
      window.addEventListener('mousemove' , ()=> {setIsFocuceOnText(false)})

      return () => {
         window.removeEventListener('keydown' , handleKeyDown)
         window.removeEventListener('keyup' , handleKeyUp)
      }
  } ,[])
}


export default useTypingWatcher