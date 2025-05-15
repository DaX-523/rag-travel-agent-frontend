import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./custom/Button";
import { NavItems } from "../constants/TextConstants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Refs for audio and navigation
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      // show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up navbar
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-screen md:w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and chat button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.jpeg" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title={isAuthenticated ? "Go to Chat" : "Chat with Zira"}
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 lg:flex hidden items-center justify-center gap-1"
              onClick={handleButtonClick}
            />
          </div>

          {/* Nav Links and Audio Button */}
          <div className="flex h-full items-center mr-8">
            <div className="hidden lg:block">
              {NavItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}

              {!isAuthenticated ? (
                <>
                  <a
                    onClick={() => navigate("/login")}
                    className="nav-hover-btn cursor-pointer"
                  >
                    Login
                  </a>
                  <a
                    onClick={() => navigate("/signup")}
                    className="nav-hover-btn cursor-pointer"
                  >
                    Sign Up
                  </a>
                </>
              ) : (
                <a onClick={logout} className="nav-hover-btn cursor-pointer">
                  Logout
                </a>
              )}
            </div>

            {/* Mobile Chat Button */}
            <Button
              id="mobile-chat-button"
              title={"Chat"}
              rightIcon={<TiLocationArrow />}
              containerClass="lg:hidden flex items-center justify-center gap-1 px-1 py-[6px] !bg-[#34d399]"
              onClick={handleButtonClick}
            />

            {/* Audio button with fixed positioning */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
