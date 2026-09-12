import { motion } from "framer-motion";
import { profile, languages } from "../data/resume";

export default function About() {
  return (
    <section id="about" className="section about about--interactive">
      <div className="container">

        <div className="about__top">
          <span className="code-marker about__marker">
            <span className="num">01</span> // about
          </span>

          <span className="about__mini-label">PROFILE / 01</span>
        </div>

        <div className="about__intro">
          <motion.div
            className="about__heading-wrap"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="about__eyebrow">JAVA DEVELOPER</p>

            <h2 className="section-heading about__heading">
              Code with purpose.
              <span> Built to work.</span>
            </h2>
          </motion.div>

          <motion.div
            className="about__intro-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <div className="about__grid">

          <motion.div
            className="about__text about__story-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="about__card-number">01</div>

            <div className="about__story">
              <p>
                I'm a Java Developer focused on building dependable
                applications with Java and Spring Boot. I work on the
                backend with REST APIs, business logic, database integration,
                and application architecture.
              </p>

              <p>
                Alongside backend development, I build responsive frontend
                experiences with React.js and connect them with
                backend services to create smooth, functional applications.
              </p>

              <p>
                I believe good software is more than code that works.
                It should be structured, maintainable, and designed with
                real users and real requirements in mind.
              </p>
            </div>

            <div className="about__languages">
              <span>Languages spoken:</span>

              <div className="about__language-list">
                {languages.map((language) => (
                  <span key={language} className="about__language">
                    {language}
                  </span>
                ))}
              </div>
            </div>

            <div className="about__corner-line" />
          </motion.div>

          <div className="about__highlights">

            <motion.div
              className="about__highlight"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              whileHover={{ y: -6 }}
            >
              <div className="about__highlight-top">
                <span className="about__highlight-index">01</span>
                <span className="about__highlight-dot" />
              </div>

              <h3>Java Development</h3>

              <p>
                Building structured backend applications with Java,
                Spring Boot, and clean business logic.
              </p>

              <div className="about__highlight-arrow">↗</div>
            </motion.div>

            <motion.div
              className="about__highlight"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              whileHover={{ y: -6 }}
            >
              <div className="about__highlight-top">
                <span className="about__highlight-index">02</span>
                <span className="about__highlight-dot" />
              </div>

              <h3>Backend Engineering</h3>

              <p>
                Designing REST APIs, handling application logic, and
                connecting services with reliable data layers.
              </p>

              <div className="about__highlight-arrow">↗</div>
            </motion.div>

            <motion.div
              className="about__highlight"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              whileHover={{ y: -6 }}
            >
              <div className="about__highlight-top">
                <span className="about__highlight-index">03</span>
                <span className="about__highlight-dot" />
              </div>

              <h3>Frontend Development</h3>

              <p>
                Creating clean, responsive interfaces with React.js
                and connecting them to backend services.
              </p>

              <div className="about__highlight-arrow">↗</div>
            </motion.div>

            <motion.div
              className="about__highlight"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.36 }}
              whileHover={{ y: -6 }}
            >
              <div className="about__highlight-top">
                <span className="about__highlight-index">04</span>
                <span className="about__highlight-dot" />
              </div>

              <h3>Problem Solving</h3>

              <p>
                Breaking complex requirements into practical solutions
                through debugging, testing, and continuous improvement.
              </p>

              <div className="about__highlight-arrow">↗</div>
            </motion.div>

          </div>
        </div>

        <motion.div
          className="about__bottom-strip"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span>JAVA</span>
          <span>SPRING BOOT</span>
          <span>REACT.JS</span>
          <span>POSTGRESQL</span>
          <span>REST API</span>
        </motion.div>

      </div>
    </section>
  );
}