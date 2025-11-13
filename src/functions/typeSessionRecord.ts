import type { KeyRecord } from "../types/experementTyping";


interface KeyRecordProps {
  sessionRecordRef: React.RefObject<KeyRecord[]>
  startTypingTimeRef: React.RefObject<number>
  currentLetter: { index: number; letter: string }
  inputKey: string
  currentText : string
}
export const recordKeyStroke = ({inputKey ,currentText , sessionRecordRef ,currentLetter , startTypingTimeRef }:KeyRecordProps) => {
    sessionRecordRef.current.push({
      isWrong : currentText[currentLetter.index] !== inputKey, 
      isTyped : true ,
      timestamp: Date.now() - startTypingTimeRef.current,
      currentLetterIndex: currentLetter.index 
    })


  }
