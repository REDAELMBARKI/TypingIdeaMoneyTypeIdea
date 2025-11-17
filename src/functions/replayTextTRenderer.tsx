

import type { JSX } from "react";
import type { ThemeColors } from "../types/experementTyping";

interface TextRendererProps {
  currentText: string;
  currentTheme: ThemeColors;
  isRecordPanelOpen ? : boolean ;
}

export const replayTextRenderer = ({ 
  currentText,
  currentTheme,
  isRecordPanelOpen = true
}:TextRendererProps) : JSX.Element | null => {
  if(!isRecordPanelOpen) return null ;
  return (
    <div className="text-renderer" >
      {currentText.split("").map((char, idx) => (
        <span
          key={idx}
          className="letter"
          style={{ color: currentTheme.gray, whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};
