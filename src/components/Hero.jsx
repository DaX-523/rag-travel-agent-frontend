import React, { useEffect, useRef, useState } from "react";
import Button from "./custom/Button";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { heroVideoLinks } from "../constants/heroVideoLinks";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ setIsLoading }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prevLoadedVideos) => prevLoadedVideos + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos, setIsLoading]);

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVideoClick = () => {
    setHasClicked(true);

    setCurrentIndex(upcomingVideoIndex);
  };

  useEffect;

  // GSAP Animation
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { depedencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => heroVideoLinks[index];

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            {/* Hero Head */}

            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 hidden sm:block md:block transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
              <video
                ref={nextVideoRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          {/* Head Hero Bg-hidden Video */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* Head Hero Bg Video */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute size-full left-0 top-0 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* Head Hero Bottom Travel Text */}
          <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
            T<b>R</b>AVEL
          </h1>

          <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
              <h1 className="special-font hero-heading text-blue-100">
                REDIFI<b>N</b>E
              </h1>

              <p className="mb-5 max-w-80 font-robert-regular text-blue-100">
                <b>Plan smarter. Wander further.</b> <br /> Our AI-powered
                travel itinerary chatbot crafts custom plans tailored to your
                vibe, pace, and passion. <br /> Just chat, and go!
              </p>

              <Button
                id="watch-trailer"
                title="Chat Now"
                leftIcon={<BiSolidPlaneAlt />}
                containerClass="!bg-yellow-300 flex-center gap-1"
                onClick={() => navigate("/login")}
              />
            </div>
          </div>
        </div>

        {/* Hero Bottom Travel black text */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
          TRA<b>V</b>EL
        </h1>
      </div>
    </div>
  );
};

export default Hero;
