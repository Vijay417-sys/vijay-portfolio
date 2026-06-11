import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    name: "Blocktix",
    category: "Blockchain / Web3",
    tools: "Solidity, Web Technologies, Smart Contracts",
    image: "/images/block_tix.png",
    link: "https://github.com/Vijay417-sys/Blocktix",
    color: "#7c3aed",
  },
  {
    num: "02",
    name: "College Event Management",
    category: "Full Stack Web App",
    tools: "Java, Spring Boot, MySQL, React",
    image: "/images/event_managment.png",
    link: "https://github.com/Vijay417-sys/event-management",
    color: "#db2777",
  },
  {
    num: "03",
    name: "VTU Internship Diary Automation",
    category: "Browser Automation",
    tools: "TypeScript, Playwright, Node.js",
    image: "/images/vtu.png",
    link: "https://github.com/Vijay417-sys/internship_dairy",
    color: "#0891b2",
  },
  {
    num: "04",
    name: "Currency Converter",
    category: "Frontend App",
    tools: "JavaScript, HTML, CSS, API",
    image: "/images/currency_converter.png",
    link: "https://github.com/Vijay417-sys/currency-convrter",
    color: "#059669",
  },
  {
    num: "05",
    name: "Kyara Beverages",
    category: "E-Commerce Website",
    tools: "HTML, CSS, JavaScript",
    image: "/images/kyara.png",
    link: "https://github.com/Vijay417-sys/Kyara",
    color: "#d97706",
  },
  {
    num: "06",
    name: "Deepfake Detection",
    category: "AI / Machine Learning",
    tools: "LSTM, React, Node.js, Python",
    image: "/images/deep_fake.png",
    link: "https://github.com/Vijay417-sys",
    color: "#e11d48",
  },
];

const Work = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!outer || !track || !sticky) return;

    const timer = setTimeout(() => {
      const totalScroll = window.innerWidth * (projects.length - 1);

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            id: "work",
            trigger: sticky,
            // Pin the sticky div — GSAP will add pinSpacing so
            // ScrollSmoother can scroll past this section to Footer
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * (projects.length - 1));
              setActiveIndex(Math.min(idx, projects.length - 1));
            },
          },
        });
      }, outer);

      return () => ctx.revert();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    /* Outer: container reference for GSAP context */
    <div
      className="work-outer"
      id="work"
      ref={outerRef}
    >
      {/* Sticky inner: stays pinned to the top of the viewport */}
      <div className="work-sticky" ref={stickyRef}>
        {/* Centered heading */}
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-dots">
            {projects.map((_, i) => (
              <span
                key={i}
                className={`work-dot ${i === activeIndex ? "active" : ""}`}
                style={
                  i === activeIndex
                    ? { background: projects[i].color }
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        {/* Sliding track */}
        <div className="work-track-wrapper">
          <div className="work-flex" ref={trackRef}>
            {projects.map((project, index) => (
              <div
                className={`work-box ${index === activeIndex ? "is-active" : ""}`}
                key={index}
                style={{ "--card-color": project.color } as React.CSSProperties}
              >
                {/* Left: info */}
                <div className="work-info">
                  <div className="work-num-badge">{project.num}</div>
                  <h3 className="work-name">{project.name}</h3>
                  <p className="work-category">{project.category}</p>
                  <div className="work-divider" />
                  <p className="work-tools-label">Tools & Features</p>
                  <p className="work-tools">{project.tools}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="work-cta"
                    data-cursor="disable"
                  >
                    View Project <MdArrowOutward />
                  </a>
                </div>

                {/* Right: image */}
                <div className="work-image">
                  <a
                    className="work-image-in"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="disable"
                  >
                    <img src={project.image} alt={project.name} />
                    <div className="work-link">
                      <MdArrowOutward />
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="work-scroll-hint">
          <span>{activeIndex + 1} / {projects.length}</span>
          <span className="work-scroll-text">scroll to explore</span>
        </div>
      </div>
    </div>
  );
};

export default Work;
