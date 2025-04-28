import { TiLocationArrow } from "react-icons/ti";
import BentoCard from "./custom/BentoCard";
import BentoTilt from "./custom/BentoTilt";

const Features = () => (
  <section id="packages" className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Into a World of Seamless Travel
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50 text-justify">
          Step into a realm where your entire travel experience unfolds in a
          beautifully interconnected way. Our thoughtfully crafted packages are
          designed to be more than just itineraries; they are immersive overlays
          on your journey. From hand-picked accommodations and seamless
          transportation to unforgettable activities and local insights, explore
          our diverse selection and discover a new dimension of travel
          convenience and wonder, all intuitively presented at your fingertips.
          Your adventure begins here.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              RAJAS<b>T</b>HAN
            </>
          }
          description="Vibrant hues paint ancient forts and bustling bazaars, where soulful music and warm hospitality echo Rajasthan's regal and artistic spirit."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                <span className="text-green-400">
                  KER<b>E</b>LA
                </span>
              </>
            }
            description="Emerald backwaters and lush hills whisper tales of ancient traditions, where fragrant spices and serene beauty define Kerala's tranquil charm."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                <span className="text-blue-300">
                  PORT<b>U</b>GAL
                </span>
              </>
            }
            description="Historic charm meets coastal beauty; soulful Fado and vibrant tiles echo Portugal's rich, seafaring heritage."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                AME<b>R</b>ICA
              </>
            }
            description="A diverse blend of innovation, individualism, and cultural exchange shapes America's dynamic and influential spirit."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
