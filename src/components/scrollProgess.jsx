import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const currentProgress =
        (scrollTop / documentHeight) * 100;

      setProgress(currentProgress);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="portfolio-scroll-progress"
      aria-hidden="true"
    >
      <div
        className="portfolio-scroll-progress__bar"
        style={{
          width: `${progress}%`,
        }}
      />

      <span
        className="portfolio-scroll-progress__dot"
        style={{
          left: `${progress}%`,
        }}
      />
    </div>
  );
}