
import { useEffect } from 'react'
import useLiveDataContext from '../contextHooks/useLiveDataContext';

interface errorTypingSoundProps {
   
    isErrorSoundEnabled:boolean ;
    inputValue : string ;
}


export default function useErrorTypingSound({inputValue  ,isErrorSoundEnabled}:errorTypingSoundProps){
    const {currentText , currentLetter} = useLiveDataContext() ; 
    const isCorrectInput = () => {
                if(inputValue === "" || currentLetter.index === 0) return true;

                if(inputValue === currentText[currentLetter.index]) return true ;
                return false ;
    }

   

    useEffect(()=>{

        if(! isErrorSoundEnabled) return ;
           
        if(! isCorrectInput()){
            const audio = new Audio('/sounds/wrong_char.mp3') ;
            const incorrectSound =  audio.cloneNode() as HTMLAudioElement;
            incorrectSound.play().catch(() => {})
        }
    },[inputValue , isErrorSoundEnabled])
}
