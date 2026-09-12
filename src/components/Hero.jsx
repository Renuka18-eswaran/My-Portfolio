
import { useEffect, useState } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Mail,
  Sparkles,
} from "lucide-react";

import { profile } from "../data/resume";

const roles = [
  "Java Developer",
  "Spring Boot Engineer",
  "React.js Developer",
  "Software Engineer",
];

function useTypewriter(words, speed = 70, pause = 1500) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, speed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => {
        setDeleting(true);
      }, pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, text.length - 1));
      }, speed / 1.6);
    } else {
      setDeleting(false);
      setWordIndex((index) => index + 1);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(roles);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 120,
    damping: 18,
  });

  const springY = useSpring(mouseY, {
    stiffness: 120,
    damping: 18,
  });

  const rotateX = useTransform(
    springY,
    [-180, 180],
    [8, -8]
  );

  const rotateY = useTransform(
    springX,
    [-180, 180],
    [-8, 8]
  );

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const initials = profile.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <section
      id="home"
      className="hero hero--interactive"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* BACKGROUND */}
      <div className="hero__background-orb hero__background-orb--one" />
      <div className="hero__background-orb hero__background-orb--two" />
      <div className="hero__grain" />

      {/* MAIN GRID */}
      <div className="hero__grid container">

        {/* LEFT CONTENT */}
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* TOP LINE */}
          <div className="hero__top-line">
            <span className="hero__top-number">
              00 / PORTFOLIO
            </span>

            <span className="hero__top-line-mark">
              SOFTWARE • JAVA • REACT
            </span>
          </div>

          {/* STATUS */}
          <div className="hero__status">
            <span className="hero__status-dot" />

            <span>
              Open to opportunities
            </span>
          </div>

          {/* GREETING */}
          <p className="hero__greeting">
            Hello, I'm
          </p>

          {/* NAME */}
          <h1 className="hero__name">
            {profile.name}

            <span className="hero__name-dot">
              .
            </span>
          </h1>

          {/* ROLE */}
          <div className="hero__role">
            <span className="hero__role-prompt">
              &gt;
            </span>

            <span className="hero__role-text">
              {typed}
            </span>

            <span className="hero__cursor">
              |
            </span>
          </div>

          {/* INTRO */}
          <p className="hero__intro">
            {profile.summary}
          </p>

          {/* ACTIONS */}
          <div className="hero__actions">

            <button
              className="hero__main-button"
              onClick={() => scrollTo("projects")}
            >
              <span>
                Explore My Work
              </span>

              <span className="hero__button-arrow">
                <ArrowUpRight size={18} />
              </span>
            </button>

            {/* RESUME - FIXED */}
            <a
              className="hero__secondary-button"
              href={`${import.meta.env.BASE_URL}Renuka-Resume.pdf`}
              download="Renuka-Resume.pdf"
            >
              <Download size={17} />

              <span>
                Resume
              </span>
            </a>

            <button
              className="hero__secondary-button"
              onClick={() => scrollTo("contact")}
            >
              <Mail size={17} />

              <span>
                Contact
              </span>
            </button>

          </div>

          {/* SOCIAL LINKS */}
          <div className="hero__socials">

            {/* GITHUB */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hero__social"
            >
              <span className="hero__social-icon">
                GH
              </span>

              <span>
                GitHub
              </span>

              <ArrowUpRight
                size={14}
                className="hero__social-arrow"
              />
            </a>

            {/* LINKEDIN */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hero__social"
            >
              <span className="hero__social-icon">
                in
              </span>

              <span>
                LinkedIn
              </span>

              <ArrowUpRight
                size={14}
                className="hero__social-arrow"
              />
            </a>

            {/* EMAIL */}
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="hero__social"
            >
              <span className="hero__social-icon">
                <Mail size={18} />
              </span>

              <span>
                Email
              </span>

              <ArrowUpRight
                size={14}
                className="hero__social-arrow"
              />
            </a>

          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          className="hero__visual"
          initial={{
            opacity: 0,
            scale: 0.85,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
          }}
        >

          {/* ORBITS */}
          <div className="hero__orbit hero__orbit--outer" />
          <div className="hero__orbit hero__orbit--middle" />
          <div className="hero__orbit hero__orbit--inner" />

          {/* ROTATING ORBIT LABEL */}
          <motion.div
            className="hero__orbit-label"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span>JAVA</span>
            <span>REACT</span>
            <span>SPRING</span>
            <span>BUILD</span>
          </motion.div>

          {/* PHOTO CARD */}
          <motion.div
            className="hero__photo-card"
            style={{
              rotateX,
              rotateY,
            }}
          >
            <div className="hero__photo-glow" />

            <div className="hero__photo-frame">

              <img
                src={`${import.meta.env.BASE_URL}profile.jpg`}
                alt={`Portrait of ${profile.name}`}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="hero__photo-overlay" />

            </div>

            {/* PHOTO CAPTION */}
            <div className="hero__photo-caption">
              <span className="hero__caption-icon">
                <Sparkles size={15} />
              </span>

              <span>
                Building with purpose
              </span>
            </div>

            {/* CARD NUMBER */}
            <span className="hero__card-number">
              01
            </span>

          </motion.div>

          {/* JAVA CARD */}
          <motion.div
            className="hero__floating-card hero__floating-card--java"
            animate={{
              y: [0, -12, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="hero__floating-icon">
              ☕
            </span>

            <span>
              Java
            </span>
          </motion.div>

          {/* REACT CARD */}
          <motion.div
            className="hero__floating-card hero__floating-card--react"
            animate={{
              y: [0, 10, 0],
              rotate: [0, -2, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="hero__floating-icon">
              ⚛
            </span>

            <span>
              React
            </span>
          </motion.div>

          {/* SPRING BOOT CARD */}
          <motion.div
            className="hero__floating-card hero__floating-card--spring"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 1.5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="hero__floating-icon">
              ◆
            </span>

            <span>
              Spring Boot
            </span>
          </motion.div>

          {/* MINI CARD */}
          <motion.div
            className="hero__mini-card"
            animate={{
              y: [0, 7, 0],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="hero__mini-card-dot" />

            <div>
              <strong>
                Full Stack
              </strong>

              <small>
                Java + React
              </small>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.button
        className="hero__scroll-indicator"
        onClick={() => scrollTo("about")}
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
        aria-label="Scroll to About"
      >
        <span>
          Scroll to explore
        </span>

        <span className="hero__scroll-line" />

        <ArrowDown size={18} />
      </motion.button>

    </section>
  );
}

