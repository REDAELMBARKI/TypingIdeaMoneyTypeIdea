




    export const lasySoundStoredState = () =>
      JSON.parse(localStorage.getItem("soundSettings") ?? `[]`).includes(
        "sound".toLowerCase()
      );
    export const lasyErrorSoundStoredState = () =>
      JSON.parse(localStorage.getItem("soundSettings") ?? `[]`).includes(
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


    export const lazyLoadedSelectedMode = () => {
        return JSON.parse(localStorage.getItem('selectedMode') ?? `"words"` ) ;
    }