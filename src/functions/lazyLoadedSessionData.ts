




    export const lasySoundStoredState = () =>
      JSON.parse(localStorage.getItem("parameters") ?? `[]`).includes(
        "sound".toLowerCase()
      );
    export const lasyErrorSoundStoredState = () =>
      JSON.parse(localStorage.getItem("parameters") ?? `[]`).includes(
        "errorSound".toLowerCase()
      );
    
    export const lazyLoadedSessionWordsCount = () => {
        return JSON.parse(localStorage.getItem('sessionWordsCount') ?? '10') ;
    }
    
    
    export const lazyLoadedSelectedTime= () => {
        return JSON.parse(localStorage.getItem('selectedTimpo') ?? '30') ;
    }
    



    export const lazyLoadeStoredParams  = () => JSON.parse(localStorage.getItem('parameters') ?? `[]`) ;


    export const lazyLoadedSoundSettings = () => JSON.parse(localStorage.getItem('soundSettings') ?? `[]` ) ;