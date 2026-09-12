import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Calendar } from "lucide-react";
import { experience } from "../data/resume";

export default function Internship() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <span className="code-marker">
          <span className="num">03</span> // internship
        </span>

        <h2 className="section-heading">Where I've worked</h2>

        <div className="timeline">
          {experience.map((job, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={job.role + job.company}
                className="timeline__item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
              >
                <div
                  className="timeline__marker"
                  aria-hidden="true"
                >
                  <span className="timeline__dot" />
                  <span className="timeline__line" />
                </div>

                <div className="timeline__card glass-panel">
                  <button
                    className="timeline__header"
                    onClick={() =>
                      setOpenIndex(isOpen ? -1 : i)
                    }
                    aria-expanded={isOpen}
                  >
                    <div>
                      <h3>{job.role}</h3>

                      <p className="timeline__company">
                        {job.company}
                      </p>
                    </div>

                    <div className="timeline__meta">
                      <span className="timeline__period">
                        <Calendar size={14} />
                        {job.period}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`timeline__chevron ${
                          isOpen ? "is-open" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <motion.div
                    className="timeline__body"
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <ul>
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>

                    <div className="timeline__tech">
                      {job.tech.map((t) => (
                        <span
                          key={t}
                          className="skills__tag"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}