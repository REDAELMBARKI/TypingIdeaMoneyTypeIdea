import { useEffect } from "react";

interface audioProps {
  allowedKeys: Set<string>;
  isNormalTypingSoundEnabled: boolean;

}
const useTypingSound = ({ allowedKeys, isNormalTypingSoundEnabled }: audioProps) => {
  useEffect(() => {
    if (!isNormalTypingSoundEnabled) return;
    const regularkey = new Audio("/sounds/keyboard-click.mp3");
    const del = new Audio("/sounds/del-key.mp3");

    const playSound = (e: KeyboardEvent) => {
      if (!allowedKeys.has(e.key)) return;

      let base: HTMLAudioElement;

      if (e.key === "Backspace" || e.key === "Delete") {
        base = del;
      } else {
        base = regularkey;
      }

      const sound = base.cloneNode() as HTMLAudioElement;
      sound.currentTime = 0;
      sound.play().catch(() => {});
    };

    window.addEventListener("keydown", playSound);

    return () => window.removeEventListener("keydown", playSound);
  }, []);

  return null;
};

export default useTypingSound;
