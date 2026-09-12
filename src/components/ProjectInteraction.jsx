import { useEffect, useRef } from "react";

export default function ProjectInteraction() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;

    if (!cursor || !label) return;

    // Disable cursor effects on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (event) => {
      const target = event.target;

      /* =========================================================
         1. PROJECT CURSOR + PROJECT SPOTLIGHT + 3D TILT
         ========================================================= */

      const card = target.closest(".project-card");

      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

      if (!card) {
        cursor.classList.remove("is-visible");
        label.classList.remove("is-visible");

        // Reset any previous project cards
        document
          .querySelectorAll(".project-card")
          .forEach((projectCard) => {
            projectCard.style.removeProperty("transform");
            projectCard.style.removeProperty("--mouse-x");
            projectCard.style.removeProperty("--mouse-y");

            const image = projectCard.querySelector("img");

            if (image) {
              image.style.removeProperty("transform");
            }
          });
      } else {
        cursor.classList.add("is-visible");
        label.classList.add("is-visible");

        label.style.left = `${event.clientX + 18}px`;
        label.style.top = `${event.clientY + 18}px`;

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const percentX = x / rect.width;
        const percentY = y / rect.height;

        /* Spotlight position */
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        /* 3D tilt */
        const rotateX = (percentY - 0.5) * -5;
        const rotateY = (percentX - 0.5) * 5;

        card.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-6px)
        `;

        /* Project image parallax */
        const image = card.querySelector("img");

        if (image) {
          const imageX = (percentX - 0.5) * 10;
          const imageY = (percentY - 0.5) * 10;

          image.style.transform = `
            scale(1.06)
            translate(${imageX}px, ${imageY}px)
          `;
        }
      }

      /* =========================================================
         2. MAGNETIC BUTTONS
         ========================================================= */

      const magneticButton = target.closest(
        ".magnetic-button, .hero__actions a, .contact__actions a, .btn"
      );

      if (magneticButton) {
        const rect = magneticButton.getBoundingClientRect();

        const buttonX =
          event.clientX - (rect.left + rect.width / 2);

        const buttonY =
          event.clientY - (rect.top + rect.height / 2);

        const strength = 0.18;

        magneticButton.style.transform = `
          translate(
            ${buttonX * strength}px,
            ${buttonY * strength}px
          )
        `;

        magneticButton.classList.add("magnetic-active");
      } else {
        document
          .querySelectorAll(
            ".magnetic-button, .hero__actions a, .contact__actions a, .btn"
          )
          .forEach((button) => {
            button.style.removeProperty("transform");
            button.classList.remove("magnetic-active");
          });
      }
    };

    const handleMouseLeave = () => {
      cursor.classList.remove("is-visible");
      label.classList.remove("is-visible");

      document
        .querySelectorAll(".project-card")
        .forEach((card) => {
          card.style.removeProperty("transform");
          card.style.removeProperty("--mouse-x");
          card.style.removeProperty("--mouse-y");

          const image = card.querySelector("img");

          if (image) {
            image.style.removeProperty("transform");
          }
        });

      document
        .querySelectorAll(
          ".magnetic-button, .hero__actions a, .contact__actions a, .btn"
        )
        .forEach((button) => {
          button.style.removeProperty("transform");
          button.classList.remove("magnetic-active");
        });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="project-interaction-cursor"
      />

      {/* Project hover label */}
      <div
        ref={labelRef}
        className="project-interaction-label"
      >
        EXPLORE PROJECT
        <span>↗</span>
      </div>
    </>
  );
}