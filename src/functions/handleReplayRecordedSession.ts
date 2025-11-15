import  type { globalStatetype } from '../types/experementTyping';
export const handleReplayRecordedSession = ({setGlobalState , setIsRecordPanelOpen} : {
    setGlobalState: React.Dispatch<React.SetStateAction<globalStatetype>>,
    setIsRecordPanelOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => { 
        
        setGlobalState({
            wrongChars: [] ,
            wrongWords: [] ,
            wordHistory: []
        })
        setIsRecordPanelOpen(true);
  
  }
