import gsap from "gsap";
import { useRef } from "react";
import Button from "../components/custom/Button";
import AnimatedTitle from "./AnimatedTitle";
import { useNavigate } from "react-router-dom";

const FloatingImage = () => {
  const navigate = useNavigate();
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm md:text-[10px]">
          THE MULTIVERSAL TRAVEL WORLD
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="The St<b>o</b>ry of Zi<b>r</b>a <b>:</b> <br /> Craf<b>t</b>ing Your hidden Adve<b>n</b>tur<b>e</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.jpeg"
                  alt="entrance.webp"
                  className="object-contain"
                />
              </div>
            </div>

            {/* for image rounded corner */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-16 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-justify">
              Zira is designed to transform your travel planning experience,
              guiding you through a seamless journey of discovery. Combining the
              power of artificial intelligence with a passion for exploration,
              Zira creates personalized itineraries that unlock the hidden
              beauty and cultural richness of every destination, making your
              travel story unforgettable.
            </p>

            <Button
              id="realm-btn"
              title="discover zira"
              containerClass="mt-5"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
