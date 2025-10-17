
import React from "react";
import type { ThemeColors } from "../types/experementTyping";

interface buttonExtraOptionProps {
     
     currentTheme : ThemeColors 
     label : string 
      Icon : React.ComponentType<React.SVGProps<SVGSVGElement>> ;
      handleParamOption: (paramType: string) => void
}

const  ButtonExtraOption = ({currentTheme , label  , Icon , handleParamOption}:buttonExtraOptionProps) => {
    
    return (
      <React.Fragment >
   
                    <button 
                    
                   
                    className="flex items-center gap-2 text-sm hover:scale-110 transition">
                                    <label className="cursor-pointer relative flex items-center gap-2">
                                        <input
                                        
                                        type="checkbox"
                                        value={label.toLowerCase()}
                                        className="h-[1px] w-[1px] opacity-0 absolute"
                                        onChange={(e) => {
                                            handleParamOption(e.target.value);
                                            const span = e.target.nextElementSibling as HTMLElement;
                                            if (e.target.checked) {
                                            
                                            span.style.borderColor = currentTheme.success;
                                            span.style.boxShadow = `0 0 10px ${currentTheme.success}55`;
                                            span.style.color = currentTheme.success;
                                            const mark = span.querySelector('.checkmark') as HTMLElement;
                                            if (mark) {
                                                mark.style.opacity = '1';
                                                mark.style.transform = 'scale(1)';
                                                mark.style.backgroundColor = currentTheme.success;
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
                                        }}
                                        />

                                        {/* Styled Label Content */}
                                        <span
                                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 relative text-xs font-medium"
                                        style={{
                                            borderWidth: '2px',
                                            borderColor: currentTheme.border,
                                            color: currentTheme.gray,
                                            backgroundColor: `${currentTheme.page_bg}22`,
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!(e.currentTarget.previousElementSibling as HTMLInputElement).checked) {
                                            e.currentTarget.style.borderColor = currentTheme.success;
                                            const check = e.currentTarget.querySelector('.checkmark') as HTMLElement;
                                            if (check) {
                                                check.style.opacity = '1';
                                                check.style.transform = 'scale(1)';
                                            }
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!(e.currentTarget.previousElementSibling as HTMLInputElement).checked) {
                                            e.currentTarget.style.borderColor = currentTheme.border;
                                            const check = e.currentTarget.querySelector('.checkmark') as HTMLElement;
                                            if (check) {
                                                check.style.opacity = '0';
                                                check.style.transform = 'scale(0)';
                                            }
                                            }
                                        }}
                                        >
                                        <span
                                            className="checkmark absolute -top-1 -left-1 w-3 h-3 rounded-full transition-all duration-200"
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
                                    </button>

      </React.Fragment>
    )
  
}

export default ButtonExtraOption ;