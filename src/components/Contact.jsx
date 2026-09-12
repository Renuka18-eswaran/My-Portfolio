import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "../data/resume";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <span className="code-marker">
          <span className="num">07</span> // contact
        </span>

        <motion.div
          className="contact__panel glass-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="contact__heading">Let's build something together</h2>
          <p className="contact__sub">
            I'm currently open to Software Engineer and Java Developer roles. Feel free to
            reach out — I usually reply quickly.
          </p>

          <a className="btn btn-primary contact__cta" href={`mailto:${profile.email}`}>
            <Mail size={17} /> Say hello — {profile.email}
          </a>

          <div className="contact__details">
            <div className="contact__detail">
              <Phone size={16} />
              <a href={`tel:${profile.phone.replace(/\s+/g, "")}`}>{profile.phone}</a>
            </div>
            <div className="contact__detail">
              <MapPin size={16} />
              <span>{profile.location}</span>
            </div>
            <div className="contact__detail">
              <GithubIcon size={16} />
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                {profile.githubLabel}
              </a>
            </div>
            <div className="contact__detail">
              <LinkedinIcon size={16} />
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                {profile.linkedinLabel}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
