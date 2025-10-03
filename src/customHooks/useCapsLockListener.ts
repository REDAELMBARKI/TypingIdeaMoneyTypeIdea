import React, { useEffect } from "react";


interface capsLockListenerProps {
setIsCapsOn : React.Dispatch<React.SetStateAction<boolean>>
}
export default function useCapsLockListener ({setIsCapsOn}:capsLockListenerProps){
    useEffect(() => {
       const capsListner = (e: KeyboardEvent) => {
         setIsCapsOn(e.getModifierState("CapsLock"));
       };
   
       window.addEventListener("keydown", capsListner);
       return () => window.removeEventListener("keydown", capsListner);
     }, []);
}
