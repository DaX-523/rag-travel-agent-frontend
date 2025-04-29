import { useNavigate } from "react-router-dom";
import AnimatedTitle from "./AnimatedTitle";
import Button from "../components/custom/Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.jpeg"
            clipClass="contact-clip-path-1"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/contact-main.jpeg"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center mt-10 sm:mt-0">
          <AnimatedTitle
            title="let's b<b>u</b>ild the <br /> new era of <br /> a<b>d</b>ven<b>t</b>ure t<b>o</b>get<b>h</b>er."
            className="special-font md:text-[6.2rem] w-full font-zentry text-2xl font-black leading-[.9]"
          />

          <Button
            title="contact us"
            containerClass="mt-10 cursor-pointer bg-white text-black"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
