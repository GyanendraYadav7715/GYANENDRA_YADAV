import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import React, { useRef } from "react";
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 300, max: 800, default: 300 },
};
const renderTest = (text, className, baseWeight = 400) => {
  return [...text].map((char, index) => {
    return (
      <span
        key={index}
        className={className}
        style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    );
  });
};
const setupTextHover = (container, type) => {
  if (!container) return;
  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];
  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      fontVariationSettings: `"wght" ${weight}`,
      duration: duration,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (event) => {
    const { left } = container.getBoundingClientRect();
    const mousex = event.clientX - left;
    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mousex - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);
      const targetWeight = min + (max - min) * intensity;
      animateLetter(letter, targetWeight, 0.1);
    });
  };
  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.5);
    });
  };
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};
const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
   const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");
    const cleanupTitle = setupTextHover(titleRef.current, "title");
    return () => {
      cleanupSubtitle();
      cleanupTitle();
    };
  }, []);
  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderTest(
          "Hey,I'm Gyanendra! Welcome to my portfolio.",
          "text-3xl font-bold font-georama",
          300
        )}
      </p>
      <h1 ref={titleRef}>
        {renderTest("portfolio", "text-9xl italic font-georama", 500)}
      </h1>

      <div className="small-screen">
        <p>
          This portfolio is designed for desktop view. Please visit on a larger
          screen for the best experience.
        </p>
      </div>
    </section>
  );
};

export default Welcome;
