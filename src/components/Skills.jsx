import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Wrench,
  Brain,
  Users,
  Sparkles,
} from "lucide-react";

import { skills } from "../data/resume";

const iconMap = {
  "Programming Languages": Code2,
  "Frameworks & Technologies": Server,
  "Tools": Wrench,
  "Technical Strengths": Brain,
  "Soft Skills": Users,
  "AI & Generative AI": Sparkles,
};

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">

        <span className="code-marker">
          <span className="num">02</span> // skills
        </span>

        <h2 className="section-heading">
          Technologies I work with
        </h2>

        <div className="skills__grid">
          {skills.map((group, i) => {
            const Icon = iconMap[group.category] || Code2;

            return (
              <motion.div
                key={group.category}
                className="skills__card glass-panel"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.5,
                  delay: (i % 3) * 0.08,
                }}
              >
                <div className="skills__icon">
                  <Icon size={22} />
                </div>

                <h3>{group.category}</h3>

                <div className="skills__tags">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="skills__tag"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}