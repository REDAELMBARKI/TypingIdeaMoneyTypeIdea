import React from 'react'

function States() {
  return (
    <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl">
          {[ 
            
            { label: 'WPM', value: '0' },
            { label: 'Accuracy', value: '100%' },
            { label: 'Time', value: '0s' },
            { label: 'Characters', value: '0' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`
                text-center p-4 rounded-xl shadow-sm
                ${
                   'bg-white/70 backdrop-blur-sm border border-gray-200/50'
                }
              `}
            >
              <div className={`text-2xl sm:text-3xl font-bold 
                text-blue-600
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

export default States