import { socialLinks } from "../constants/socilaLinks";

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left font-mono">
          Copyright © 2025 ZIRA Inc. All rights reserved.
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white">
              {link.icon}
            </a>
          ))}
        </div>

        <p className="text-center text-sm font-light hover:underline md:text-right font-mono cursour-pointer">
          Made by Zira Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;
