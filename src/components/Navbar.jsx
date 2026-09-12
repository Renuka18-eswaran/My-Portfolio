import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  X,
  CircleDot,
} from "lucide-react";

import { navLinks, profile } from "../data/resume";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  /* =========================================================
     SCROLL STATE
     ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     ACTIVE SECTION
     ========================================================= */

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActive(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75],
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =========================================================
     NAVIGATION
     ========================================================= */

  const handleClick = (id) => {
    setMenuOpen(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* =====================================================
          DESKTOP VERTICAL ORBIT NAVBAR
          ===================================================== */}

      <aside
        className={`orbit-navbar ${
          scrolled ? "orbit-navbar--scrolled" : ""
        }`}
        aria-label="Primary navigation"
      >
        <div className="orbit-navbar__rail">

          {/* =================================================
              TOP MONOGRAM
              ================================================= */}

          <button
            className="orbit-navbar__logo"
            onClick={() => handleClick("home")}
            aria-label="Go to home"
          >
            <span className="orbit-navbar__logo-ring" />

            <span className="orbit-navbar__logo-text">
              RE
            </span>

            <span className="orbit-navbar__logo-dot" />
          </button>


          {/* =================================================
              ROTATING IDENTITY
              ================================================= */}

          <div className="orbit-navbar__identity">
            <span className="orbit-navbar__identity-ring">
              <span>SOFTWARE</span>
              <span>ENGINEER</span>
              <span>RE • 2026</span>
              <span>SOFTWARE</span>
            </span>

            <span className="orbit-navbar__identity-center">
              RE
            </span>
          </div>


          {/* =================================================
              NAVIGATION
              ================================================= */}

          <nav className="orbit-navbar__links">
            {navLinks.map((link, index) => {
              const isActive = active === link.id;
              const isHovered = hovered === link.id;

              return (
                <button
                  key={link.id}
                  className={`orbit-navbar__link ${
                    isActive
                      ? "orbit-navbar__link--active"
                      : ""
                  } ${
                    isHovered
                      ? "orbit-navbar__link--hovered"
                      : ""
                  }`}
                  onClick={() => handleClick(link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  onMouseLeave={() => setHovered(null)}
                  aria-current={
                    isActive ? "page" : undefined
                  }
                >
                  <span className="orbit-navbar__link-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="orbit-navbar__link-dot">
                    <CircleDot size={9} />
                  </span>

                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.span
                        className="orbit-navbar__link-label"
                        initial={{
                          opacity: 0,
                          x: -8,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -8,
                        }}
                        transition={{
                          duration: 0.18,
                        }}
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {isActive && (
                    <motion.span
                      layoutId="orbit-active-line"
                      className="orbit-navbar__active-line"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>


          {/* =================================================
              BOTTOM MARK
              ================================================= */}

          <div className="orbit-navbar__bottom">
            <span className="orbit-navbar__bottom-line" />

            <span className="orbit-navbar__bottom-text">
              01
            </span>

            <span className="orbit-navbar__bottom-line" />
          </div>
        </div>
      </aside>


      {/* =====================================================
          MOBILE NAVBAR
          ===================================================== */}

      <header
        className={`orbit-mobile ${
          scrolled ? "orbit-mobile--scrolled" : ""
        }`}
      >
        <div className="orbit-mobile__bar">

          <button
            className="orbit-mobile__brand"
            onClick={() => handleClick("home")}
            aria-label="Go to home"
          >
            <span className="orbit-mobile__brand-mark">
              RE
            </span>

            <span className="orbit-mobile__brand-name">
              {profile.name}
            </span>
          </button>


          <div className="orbit-mobile__status">
            <span />
            AVAILABLE
          </div>


          <button
            className="orbit-mobile__toggle"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>


        {/* =================================================
            MOBILE MENU
            ================================================= */}

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="orbit-mobile__menu"
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.28,
                ease: "easeInOut",
              }}
            >
              <div className="orbit-mobile__menu-heading">
                <span>EXPLORE</span>

                <span>
                  {String(
                    navLinks.findIndex(
                      (item) => item.id === active
                    ) + 1
                  ).padStart(2, "0")}
                </span>
              </div>

              <nav className="orbit-mobile__links">
                {navLinks.map((link, index) => (
                  <button
                    key={link.id}
                    className={`orbit-mobile__link ${
                      active === link.id
                        ? "is-active"
                        : ""
                    }`}
                    onClick={() =>
                      handleClick(link.id)
                    }
                  >
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <strong>{link.label}</strong>

                    <ArrowUpRight size={17} />
                  </button>
                ))}
              </nav>

              <div className="orbit-mobile__footer">
                <span className="orbit-mobile__footer-dot" />

                <span>
                  ASPIRING SOFTWARE ENGINEER
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}