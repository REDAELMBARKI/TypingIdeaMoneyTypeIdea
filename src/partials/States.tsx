import React, { useEffect } from 'react'
import type { ThemeColors } from '../types/experementTyping';

function States({ wpmFinal , currentTheme }:{ wpmFinal: number , currentTheme: ThemeColors}) {
  const [highestWpm , setHighestWpm] = React.useState<number>(0) ;

  // update the highest wpm reacheed
  useEffect(() => {
     if(highestWpm >= wpmFinal )return ;

     setHighestWpm(wpmFinal) ;
  }, [wpmFinal]);


  return (
    <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl opacity-0 animate-appear-smooth flex gap-3">
          {[ 
            
            { label: 'Highest WPM', value: highestWpm },
            { label: 'Accuracy', value: '100%' },
            { label: 'Time', value: '0s' },
            { label: 'Characters', value: '0' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`
                text-center p-4 rounded-xl shadow-sm
                ${
                   ` backdrop-blur-sm border border-${currentTheme.border}` 
                }
              `}

              style={{ color : currentTheme.buttonHover}}
            >
              <div className={`text-2xl sm:text-3xl font-bold 
                text-[${currentTheme.red}]
              `}>
                {stat.value}
              </div>
              <div className={`text-sm font-medium mt-1 text-gray-600'
               `}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
  )
}

export default React.memo(States)