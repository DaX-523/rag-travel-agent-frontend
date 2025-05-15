import React from "react";
import { useAnimation } from "../context/AnimationContext";

const AnimatedContent = ({ children }) => {
  const { showAnimation } = useAnimation();

  return (
    <div
      className={`${
        showAnimation ? "animate-content-appear opacity-0" : "opacity-100"
      } transition-opacity duration-300`}
    >
      {children}
    </div>
  );
};

export default AnimatedContent;
