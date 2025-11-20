import { useContext } from "react"
import { TypingSessionStateContext } from "../contexts/TypingSessionStateContext"





export const useTypingSessionStateContext = () => {
const con = useContext(TypingSessionStateContext) ; 
if(!con) throw new Error('you should past typingsessionSTates in the provider ')  
return con ;

}