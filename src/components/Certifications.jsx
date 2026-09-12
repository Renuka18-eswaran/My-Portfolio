import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certifications } from "../data/resume";

export default function Certifications() {
  return (
    <section id="certifications" className="section certifications">
      <div className="container">
        <span className="code-marker">
          <span className="num">06</span> // certifications
        </span>
        <h2 className="section-heading">Courses &amp; certifications</h2>

        <div className="certifications__grid">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="certifications__card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Award size={20} className="certifications__icon" />
              <h3>{cert.name}</h3>
              <p>{cert.issuer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
