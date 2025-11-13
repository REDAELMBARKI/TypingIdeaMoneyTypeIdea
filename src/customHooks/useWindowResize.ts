import React, { useEffect } from 'react'
interface windowResizeProps {
    containerRef: React.RefObject<HTMLDivElement | null> ;
    setContainerWidth: React.Dispatch<React.SetStateAction<number>>
}
const  useWindowResize = ({containerRef  ,setContainerWidth }:windowResizeProps) => {

   
    useEffect(()=>{
         if(! containerRef.current) return ;
         // initialy set the container width 
         setContainerWidth(containerRef.current!.offsetWidth) ;
        
         const resize = () => {
             setContainerWidth(containerRef.current!.offsetWidth)
         }


         window.addEventListener('resize' , resize) ;
         return () => window.removeEventListener('resize' , resize) ;
    } ,[containerRef])
 

  
}



export default useWindowResize ;