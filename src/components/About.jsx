import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zira
        </p>

        <AnimatedTitle
          title="Unl<b>o</b>ck the world's <br /> most unforgettable <b>a</b>dventures"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p className="block md:hidden">
            Every adventure, one platform, from dream to
            destination.
          </p>
          <p className="text-gray-500 hidden md:block">
            Plan smarter, travel better. Organize every
            journey—flights, stays, experiences—into one
            seamless itinerary, accessible anytime, anywhere
            you go.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.jpeg"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
