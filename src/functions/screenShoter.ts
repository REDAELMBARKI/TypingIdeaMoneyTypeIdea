import html2canvas from "html2canvas";



export const screenShoter = async (container:HTMLDivElement) => { 
     if(!container) return ;
     const canvas = await html2canvas(container , {
        useCORS : true , 
        scale : 2 
     })
    
     const image = await canvas.toDataURL("image/png") ; 

     const link = document.createElement('a') ; 
    link.href = image ; 
    link.download = "scrshot"
    link.click()  
  }; 
