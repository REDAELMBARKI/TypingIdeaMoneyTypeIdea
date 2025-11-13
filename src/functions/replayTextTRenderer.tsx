

import React from "react";
import type { ThemeColors } from "../types/experementTyping";

interface TextRendererProps {
  currentText: string;
  currentTheme: ThemeColors;
}

export const replayTextRenderer: React.FC<TextRendererProps> = ({
  currentText,
  currentTheme,
}) => {
  return (
    <div className="text-renderer">
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
