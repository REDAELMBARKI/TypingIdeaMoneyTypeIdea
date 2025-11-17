import useThemeHook from "../customHooks/useThemeHook";
import { RotateCw } from "lucide-react";

const AnimatedArrowLeftRightButton = () => {
  const { currentTheme } = useThemeHook();
  
  return (
    <>
      <style>{`
        .btn-conteiner {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: ${currentTheme.buttonPrimary}99;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 0.2em 0 ${currentTheme.buttonPrimary}99;
        }
        
        .btn-content:hover {
          background: ${currentTheme.buttonPrimary};
          box-shadow: 0 0 0.4em 0 ${currentTheme.buttonPrimary};
          transform: scale(1.1);
        }
        
        .restart-icon {
          color: ${currentTheme.white};
          transition: transform 0.6s ease;
        }
        
        .btn-content:hover .restart-icon {
          transform: rotate(360deg);
        }
      `}</style>

      <div className="btn-conteiner">
        <button className="btn-content">
          <RotateCw className="restart-icon" size={24} strokeWidth={2} />
        </button>
      </div>
    </>
  );
};

export default AnimatedArrowLeftRightButton;