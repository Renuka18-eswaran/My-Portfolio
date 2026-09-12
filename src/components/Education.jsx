import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "../data/resume";

export default function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <span className="code-marker">
          <span className="num">05</span> // education
        </span>
        <h2 className="section-heading">Education</h2>

        <div className="education__list">
          {education.map((ed, i) => (
            <motion.div
              key={ed.degree}
              className="education__card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="education__icon">
                <GraduationCap size={22} />
              </div>
              <div className="education__info">
                <h3>{ed.degree}</h3>
                <p className="education__institution">{ed.institution}</p>
                <div className="education__meta">
                  <span>{ed.period}</span>
                  <span className="education__dot">•</span>
                  <span>{ed.detail}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
