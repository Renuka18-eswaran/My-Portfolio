import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  X,
} from "lucide-react";

import { projects } from "../data/resume";

const getProjectName = (project) =>
  project.name ||
  project.title ||
  "Project";

const getTech = (project) => {
  if (Array.isArray(project.tech)) {
    return project.tech;
  }

  if (Array.isArray(project.technologies)) {
    return project.technologies;
  }

  if (typeof project.tech === "string") {
    return project.tech
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const getDescription = (project) =>
  project.description ||
  project.summary ||
  project.tagline ||
  "A software project focused on solving a practical problem with modern technologies.";

const getImage = (project) =>
  project.image ||
  project.img ||
  project.imageUrl ||
  "";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  /* =========================================================
     FILTERS
     ========================================================= */

  const filters = useMemo(() => {
    const techs = projects.flatMap(getTech);

    return [
      "All",
      ...Array.from(new Set(techs)).slice(0, 7),
    ];
  }, []);

  /* =========================================================
     FILTERED PROJECTS
     ========================================================= */

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) =>
      getTech(project)
        .map((tech) => tech.toLowerCase())
        .includes(activeFilter.toLowerCase())
    );
  }, [activeFilter]);

  return (
    <section
      id="projects"
      className="section projects-section"
    >
      <div className="container">

        {/* =====================================================
            SECTION HEADER
            ===================================================== */}

        <motion.div
          className="section-heading projects-heading"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.6,
          }}
        >

          <div>

            <span className="section-kicker">
              03 / PROJECT LAB
            </span>

            <h2>
              Things I've
              <span> built.</span>
            </h2>

          </div>

          <p>
            Explore selected projects, technologies,
            and the problems behind each build.
          </p>

        </motion.div>


        {/* =====================================================
            FILTER BUTTONS
            ===================================================== */}

        <div className="project-filters">

          {filters.map((filter) => (

            <button
              key={filter}
              className={`project-filter ${
                activeFilter === filter
                  ? "project-filter--active"
                  : ""
              }`}
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>

          ))}

        </div>


        {/* =====================================================
            PROJECT GRID
            ===================================================== */}

        <motion.div
          layout
          className="projects-grid"
        >

          <AnimatePresence mode="popLayout">

            {filteredProjects.map(
              (project, index) => {

                const image = getImage(project);
                const projectName =
                  getProjectName(project);

                return (
                  <motion.article
                    layout
                    key={
                      project.id ||
                      project.name ||
                      project.title ||
                      index
                    }
                    className="project-card"
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.94,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.06,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                  >

                    {/* =================================================
                        PROJECT IMAGE
                        ================================================= */}

                    <div className="project-card__image">

                      {image ? (

                        <img
                          src={image}
                          alt={projectName}
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />

                      ) : (

                        <div className="project-card__image-fallback">

                          <span>
                            {projectName
                              .slice(0, 1)
                              .toUpperCase()}
                          </span>

                        </div>

                      )}

                      <div className="project-card__image-overlay" />


                      {/* PROJECT NUMBER */}

                      <div className="project-card__number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>


                      {/* OPEN BUTTON */}

                      <button
                        className="project-card__open"
                        onClick={() =>
                          setSelectedProject(project)
                        }
                        aria-label={`Open ${projectName}`}
                      >
                        <ArrowUpRight size={20} />
                      </button>

                    </div>


                    {/* =================================================
                        PROJECT CONTENT
                        ================================================= */}

                    <div className="project-card__body">

                      <div className="project-card__topline">

                        <span>
                          PROJECT
                        </span>

                        <span>
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                      </div>


                      {/* PROJECT TITLE */}

                      <h3>
                        {projectName}
                      </h3>


                      {/* =================================================
                          ACTIONS
                          ================================================= */}

                      <div className="project-card__actions">

                        {/* GITHUB */}

                        {project.github && (

                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="project-github-icon">
                              GH
                            </span>

                            GitHub
                          </a>

                        )}


                        {/* LIVE DEMO */}

                        {project.live && (

                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={16} />

                            Live Demo
                          </a>

                        )}


                        {/* CASE STUDY */}

                        <button
                          onClick={() =>
                            setSelectedProject(
                              project
                            )
                          }
                        >
                          View Case Study

                          <ArrowUpRight size={15} />
                        </button>

                      </div>

                    </div>

                  </motion.article>
                );
              }
            )}

          </AnimatePresence>

        </motion.div>


        {/* =====================================================
            EMPTY STATE
            ===================================================== */}

        {filteredProjects.length === 0 && (

          <div className="projects-empty">
            No projects found for this technology.
          </div>

        )}

      </div>


      {/* =========================================================
          PROJECT MODAL
          ========================================================= */}

      <AnimatePresence>

        {selectedProject && (

          <motion.div
            className="project-modal"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setSelectedProject(null)
            }
          >

            <motion.div
              className="project-modal__content"
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* CLOSE */}

              <button
                className="project-modal__close"
                onClick={() =>
                  setSelectedProject(null)
                }
                aria-label="Close project"
              >
                <X size={21} />
              </button>


              {/* MODAL IMAGE */}

              <div className="project-modal__image">

                {getImage(selectedProject) ? (

                  <img
                    src={getImage(selectedProject)}
                    alt={getProjectName(
                      selectedProject
                    )}
                  />

                ) : (

                  <div className="project-modal__fallback">

                    {getProjectName(
                      selectedProject
                    )
                      .slice(0, 1)
                      .toUpperCase()}

                  </div>

                )}

              </div>


              {/* =====================================================
                  CASE STUDY CONTENT
                  ===================================================== */}

              <div className="project-modal__body">

                <span className="section-kicker">
                  PROJECT CASE STUDY
                </span>


                {/* FULL PROJECT TITLE */}

                <h3>
                  {getProjectName(
                    selectedProject
                  )}
                </h3>


                {/* FULL DESCRIPTION */}

                <p>
                  {getDescription(
                    selectedProject
                  )}
                </p>


                {/* TECHNOLOGIES */}

                <div className="project-modal__tech">

                  {getTech(
                    selectedProject
                  ).map((item) => (

                    <span key={item}>
                      {item}
                    </span>

                  ))}

                </div>


                {/* LINKS */}

                <div className="project-modal__links">

                  {selectedProject.github && (

                    <a
                      href={
                        selectedProject.github
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                    >
                      <span className="project-github-icon">
                        GH
                      </span>

                      View GitHub
                    </a>

                  )}


                  {selectedProject.live && (

                    <a
                      href={
                        selectedProject.live
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <ExternalLink size={17} />

                      Open Live Project
                    </a>

                  )}

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
}