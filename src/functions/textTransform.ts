import useLiveDataContext from "../contextHooks/useLiveDataContext";


export const useTextTransformer = () => {
    
const {setCurrentText} =  useLiveDataContext()


// numbers 
const  addNumbersToText  = () => {
  setCurrentText((prevTxt)=>{
    const transformArray = prevTxt.split(/(\s+)/);

        for (let i = 0; i < transformArray.length; i += 10) {
            
            const number = Math.floor(Math.random() * 9999);
            transformArray[i] = transformArray[i] + " " + number; 
        }


   return transformArray.join("")
  })
}

const removeNumbersFromText = (  ) => { 
    setCurrentText(prevTxt => prevTxt.replace(/\s+\d+/g, ''));
} 

// end numbers 

// puctuation

const addPunctuationToText = () => {
    
  setCurrentText(prevTxt => 
    prevTxt.replace(/([.,]\s*)(\w)/g, (_, punct, letter) => 
      punct + letter.toUpperCase()
    )
  )
}

const removePunctuationFromText =  () => {
setCurrentText(prevTxt => prevTxt.replace(/[A-Z]/g , (match)=> match.toLowerCase() ))
    
}

// end punctuation

// quotation 
const addQuotesToText =  () => {
  

}
// quotation 

return {addNumbersToText , removeNumbersFromText , 
       addPunctuationToText , removePunctuationFromText ,
       }










// const addSymbolsToText : (currentText:string) => string = (currentText:string) => {

// return ''

// } 


}