import React, { useState, useEffect } from "react";
import { Plane, Cloud } from "lucide-react";

const PlaneAnimation = ({ onAnimationComplete }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    // Set a timer to mark the animation as complete after the animation duration
    const timer = setTimeout(() => {
      setAnimationCompleted(true);
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 5000); // Animation takes 5 seconds

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none ${
        animationCompleted ? "hidden" : "block"
      }`}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2ea043] to-[#34d399] opacity-70"></div>
      {/* Accent color gradients */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#2ea043]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#34d399]/20 rounded-full blur-3xl"></div>
      {/* Plane */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-plane-fly">
          <Plane
            className="text-white w-16 h-16 md:w-24 md:h-24 drop-shadow-lg transform-gpu"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Message beneath plane */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="mt-36 md:mt-40 text-center">
          <p className="text-white text-lg md:text-xl font-medium animate-pulse bg-gradient-to-r from-[#2ea043] to-[#34d399] bg-clip-text text-transparent drop-shadow-lg">
            Exploring the world for your perfect journey...
          </p>

          {/* Loading dots */}
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#2ea043] animate-bounce"></div>
            <div
              className="w-2 h-2 rounded-full bg-[#2ea043] animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-[#2ea043] animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Clouds */}
      <div className="absolute inset-0">
        <div className="animate-cloud-1">
          <Cloud
            className="text-white w-12 h-12 md:w-16 md:h-16 opacity-80 absolute top-[30%]"
            strokeWidth={1}
          />
        </div>
      </div>
      <div className="absolute inset-0">
        <div className="animate-cloud-2">
          <Cloud
            className="text-white w-16 h-16 md:w-20 md:h-20 opacity-70 absolute top-[45%]"
            strokeWidth={1}
          />
        </div>
      </div>
      <div className="absolute inset-0">
        <div className="animate-cloud-3">
          <Cloud
            className="text-white w-10 h-10 md:w-14 md:h-14 opacity-90 absolute top-[60%]"
            strokeWidth={1}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaneAnimation;
