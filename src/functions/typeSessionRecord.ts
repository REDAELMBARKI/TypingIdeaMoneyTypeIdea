import type { KeyRecord } from "../types/experementTyping";


interface KeyRecordProps {
  sessionRecordRef: React.RefObject<KeyRecord[]>
  startTypingTimeRef: React.RefObject<number>
  currentLetter: { index: number; letter: string }
  inputKey: string
}
export const recordKeyStroke = ({inputKey , sessionRecordRef ,currentLetter , startTypingTimeRef }:KeyRecordProps) => {
    sessionRecordRef.current.push({
      key: inputKey,
      timestamp: Date.now() - startTypingTimeRef.current,
      currentLetterIndex: currentLetter.index 
    })
  }
