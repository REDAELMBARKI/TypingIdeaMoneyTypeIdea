

interface timeAmountCountProps {
   startTypingTimeRef: React.RefObject<number>;
   amountOfTimeRef: React.RefObject<number | null>;
}
export const timeAmountCountHandler = ({startTypingTimeRef , amountOfTimeRef}:timeAmountCountProps) => {
          if(! startTypingTimeRef.current) {
             console.warn("starting date is not set ")  ;
          }
          const sessionTime =  Date.now() - startTypingTimeRef.current;
          amountOfTimeRef.current = sessionTime / 1000  / 60  ;
}