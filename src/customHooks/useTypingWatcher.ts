import { useEffect } from "react";

interface typingWatcherProps{
    setIsTypingActive : React.Dispatch<React.SetStateAction<boolean>>
}

const useTypingWatcher = ({setIsTypingActive}:typingWatcherProps) => {
   useEffect(()=>{
      // watches if typing isactive or not 
      const handleKeyDown = () =>  setIsTypingActive(true) ;
      
      const handleKeyUp = () => setIsTypingActive(false) ;
      
      window.addEventListener('keydown' ,handleKeyDown)
      window.addEventListener('keyup' ,handleKeyUp)


      return () => {
         window.removeEventListener('keydown' , handleKeyDown)
         window.removeEventListener('keyup' , handleKeyUp)
      }
  } ,[])
}


export default useTypingWatcher