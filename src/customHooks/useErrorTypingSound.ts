
import { useEffect } from 'react'
import type { currentLetterType } from '../types/maintyping';

interface errorTypingSoundProps {
    currentLetter : currentLetterType ;
    currentText : string ; 
    isErrorSoundEnabled:boolean ;
    inputValue : string ;
}


export default function useErrorTypingSound({inputValue , currentText , currentLetter ,isErrorSoundEnabled}:errorTypingSoundProps){
    
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
    },[inputValue])
}
