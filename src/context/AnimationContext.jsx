import React, { createContext, useState, useContext, ReactNode } from "react";

const AnimationContext = createContext(undefined);

export const AnimationProvider = ({ children }) => {
  const [showAnimation, setShowAnimation] = useState(true); // Show on initial load

  const triggerAnimation = () => {
    setShowAnimation(true);
    // Reset to false after animation completes
    setTimeout(() => setShowAnimation(false), 5000);
  };

  return (
    <AnimationContext.Provider value={{ showAnimation, triggerAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
