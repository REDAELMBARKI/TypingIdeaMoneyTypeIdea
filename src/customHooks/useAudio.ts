
import { useEffect } from "react";

const useAudio = () => {
     
useEffect(()=>{
      const regularkey = new Audio('/sounds/keyboard-click.mp3'); 
      const del = new Audio('/sounds/del-key.mp3');
     

      const playSound = (e:KeyboardEvent) => {
           
            let base:HTMLAudioElement ;


            if(e.key === 'Backspace' || e.key === 'Delete' ){
                base = del;
            }else{
               base = regularkey ;

            }

            const sound = base.cloneNode() as HTMLAudioElement ;
            sound.currentTime = 0 ;
            sound.play().catch(() => {}); 
      }


      window.addEventListener('keydown' , playSound);


      return () => window.removeEventListener('keydown' , playSound);
},[])

return null;

}


export default useAudio ;