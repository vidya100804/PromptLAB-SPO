import { useEffect, useRef, useState, createElement, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import "../styles/texttype.css";

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 40,
  initialDelay = 500,
  pauseDuration = 2000,
  deletingSpeed = 25,
  loop = false,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "●",
  cursorClassName = "",
  cursorBlinkDuration = 0.6,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const cursorRef = useRef(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
  let timeout;

  if (currentCharIndex < textArray[0].length) {
    timeout = setTimeout(() => {
      setDisplayedText(prev => prev + textArray[0][currentCharIndex]);
      setCurrentCharIndex(prev => prev + 1);
    }, typingSpeed);
  } else {
    // 🔁 Restart typing after pause
    timeout = setTimeout(() => {
      setDisplayedText("");
      setCurrentCharIndex(0);
    }, pauseDuration);
  }

  return () => clearTimeout(timeout);
}, [currentCharIndex, textArray, typingSpeed, pauseDuration]);


  return createElement(
    Component,
    { className: `text-type ${className}`, ...props },
    <>
      <span className="text-type__content">{displayedText}</span>
      {showCursor && (
        <span ref={cursorRef} className={`text-type__cursor ${cursorClassName}`}>
          {cursorCharacter}
        </span>
      )}
    </>
  );
};

export default TextType;
