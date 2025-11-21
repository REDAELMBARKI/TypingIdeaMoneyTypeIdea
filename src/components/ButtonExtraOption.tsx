
import React, { useState , useRef , useEffect } from "react";
import type { ThemeColors } from "../types/experementTyping";

interface buttonExtraOptionProps {
     
     currentTheme : ThemeColors 
     label : string 
      Icon : React.ComponentType<React.SVGProps<SVGSVGElement>> ;
      handleParamOption ? : (paramType: string) => void
      handleSoundSettingOption?: (soundSet: string) => void
      action? : (currentText?:string ) => void
      selectedParameters?: string[] 
      soundSettings?: string[] 
      style? : React.CSSProperties
}

const  ButtonExtraOption = ({style ,  soundSettings = [] ,  selectedParameters = [] , action , currentTheme , label  , Icon , handleParamOption , handleSoundSettingOption}:buttonExtraOptionProps) => {
    const ButtonRef = useRef<HTMLButtonElement | null>(null);
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const isBoolean = selectedParameters
                      .concat(soundSettings)
                      .includes(label.toLowerCase());


    const [isCheckedParam , setIsCheckedParam] = useState<boolean>(isBoolean);
    const [isHighlighted , setIsHighlighted] = useState<boolean>(isBoolean)
    
    useEffect(() => {
        const shouldHighlight= selectedParameters.includes(label.toLowerCase());
        setIsHighlighted(shouldHighlight) ;
    } , [soundSettings , selectedParameters , label])




    useEffect(() => {
 
       if(! spanRef.current || ! ButtonRef.current ) return ;

       const isShouldBeHighlighted = isHighlighted || isCheckedParam ;
       const span  =  spanRef.current ;
       if (isShouldBeHighlighted) { 
            span.style.borderColor = currentTheme.buttonPrimary;
            span.style.boxShadow = `0 0 10px ${currentTheme.buttonPrimary}55`;
            span.style.color = currentTheme.buttonPrimary;
            const mark = span.querySelector('.checkmark') as HTMLElement;
            if (mark) {
                mark.style.opacity = '1';
                mark.style.transform = 'scale(1)';
                mark.style.backgroundColor = currentTheme.buttonHover;
        }
        } else {
        span.style.borderColor = currentTheme.border;
        span.style.boxShadow = 'none';
        span.style.color = currentTheme.gray;
        const mark = span.querySelector('.checkmark') as HTMLElement;
        if (mark) {
            mark.style.opacity = '0';
            mark.style.transform = 'scale(0)';
        }
        }
    }, [isCheckedParam , isHighlighted , currentTheme ]);
    return (
      <React.Fragment >
   
                    <div 
                    style={{userSelect : 'none'}}
                    className={`flex items-center gap-2 text-sm hover:scale-110 transition  rounded-lg`}>
                                    <label  className="cursor-pointer relative flex items-center rounded-lg " 
                                    
                                    style={style ?? {}}
                                    >
                                        <button
                                        ref={ButtonRef}
                                        onClick={() => {
                                            
                                            setIsCheckedParam(prev => !prev)
                                            handleParamOption?.(label.toLowerCase());
                                            action?.();
                                            handleSoundSettingOption?.(label.toLowerCase());
                                       
                                        }}
                                        ></button>

                                        {/* Styled Label Content */}
                                        <span
                                        
                                        ref={spanRef}
                                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 relative text-xs font-medium "
                                        style={{
                                            borderWidth: '2px',
                                            borderColor: currentTheme.border,
                                            color: currentTheme.gray,
                                            backgroundColor: `${currentTheme.page_bg}22`,
                                        }}
                                       
                                        >
                                        <span
                                            className="checkmark absolute -top-1  -left-1 w-3 h-3 rounded-full transition-all duration-200"
                                            style={{
                                            border: `2px solid ${currentTheme.border}`,
                                            opacity: 0,
                                            transform: 'scale(0)',
                                            }}
                                        ></span>

                                        <Icon />
                                        <span>{label}</span>
                                        </span>
                                    </label>
                                    </div>

      </React.Fragment>
    )
  
}

export default ButtonExtraOption ;