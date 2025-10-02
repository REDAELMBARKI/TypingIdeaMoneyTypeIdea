

interface ElapsedTimeHandlerProps {
    selectedTime : number ;
    setElapsedTime : React.Dispatch<React.SetStateAction<number>>
}

export const ElapsedTimeHandler = ({selectedTime , setElapsedTime}:ElapsedTimeHandlerProps) => {
    if (!selectedTime) return;
    // time calculation
    let selectedTimeCopy = selectedTime;

    const intervalId = setInterval(() => {
      selectedTimeCopy -= 1 ;
      if (selectedTimeCopy === 0) {
        clearInterval(intervalId);
        
      }
      setElapsedTime(selectedTimeCopy);
    }, 1000);
  };