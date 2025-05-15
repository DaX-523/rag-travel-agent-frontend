import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Hero from "../components/Hero";
import About from "../components/About";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import FloatingImage from "../components/Story";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Loader from "../components/custom/Loader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to chat if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center fixed inset-0 z-[100] bg-white dark:bg-black">
          <Loader />
        </div>
      )}

      <Navbar />

      <Hero setIsLoading={setIsLoading} />

      <About />

      <Features />

      <FloatingImage />

      <Contact />

      <Footer />
    </main>
  );
};

export default Home;
