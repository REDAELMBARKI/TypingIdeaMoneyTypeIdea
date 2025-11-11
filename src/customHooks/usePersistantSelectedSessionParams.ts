import { useEffect } from "react";



interface usePersistantSelectedSessionParamsProps {
    sessionWordsCount?:number ;
    selectedTime?:number ;
    didMountsessionWordsCount : React.RefObject<boolean> ;
    didMountSelectedTime : React.RefObject<boolean> ;
}
const usePersistantSelectedSessionParams = ({sessionWordsCount , selectedTime , didMountsessionWordsCount , didMountSelectedTime }:usePersistantSelectedSessionParamsProps) => {



       useEffect(() => {
    if(didMountsessionWordsCount.current) localStorage.setItem('sessionWordsCount' , JSON.stringify(sessionWordsCount)) ;
    else{
      didMountsessionWordsCount.current = true ;
    }
  }, [sessionWordsCount]);

   useEffect(() => {
    if(didMountSelectedTime.current) localStorage.setItem('selectedTimpo' , JSON.stringify(selectedTime)) ;
    else{
      didMountSelectedTime.current = true ;
    }
  }, [selectedTime]);



}


export default usePersistantSelectedSessionParams ;