import "./styles/About.css";

const About = () => {
  const scrollToNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(".whatIDO");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    /* id="about" is the scroll anchor — navbar links to #about */
    <section className="about-section" id="about">

      {/* LEFT HALF — decorative / empty space */}
      <div className="about-left">
        <div className="about-left-deco">
          <span className="deco-ring deco-ring-1" />
          <span className="deco-ring deco-ring-2" />
          <span className="deco-ring deco-ring-3" />
        </div>
      </div>

      {/* RIGHT HALF — all content lives here */}
      <div className="about-right">

        {/* Small label */}
        <span className="about-label">Who I Am</span>

        {/* Big title */}
        <h2 className="about-title">About Me</h2>

        {/* Divider */}
        <div className="about-divider">
          <span className="divider-line" />
          <span className="divider-dot" />
          <span className="divider-line" />
        </div>

        {/* Paragraph */}
        <p className="about-para">
          Computer Science undergraduate{" "}
          <span className="hl">(B.E. 2026)</span> at{" "}
          <span className="hl">Acharya Institute of Technology</span>{" "}
          with a CGPA of <span className="hl">8.6</span>. I work across the
          full technology stack — building{" "}
          <span className="hl">Frontend &amp; Backend</span> systems with Java,
          Spring Boot, and React.js, while also handling{" "}
          <span className="hl">DevOps &amp; Cloud</span> workflows using Docker,
          Jenkins, and <span className="hl">AWS</span> (EC2, S3, RDS). Proficient
          in <span className="hl">MySQL</span> for database design and
          management. Currently a{" "}
          <span className="hl">Java Full-Stack Developer Intern</span> at Dhee
          Coding Lab, passionate about building scalable, production-ready
          software from code to cloud.
        </p>

        {/* Skill chips */}
        <div className="about-chips">
          {["Java", "JavaScript", "HTML", "CSS","Bootstrap" ,"React.js", "MySQL", "AWS", "Docker", "DevOps", "Jenkins"].map(
            (skill) => (
              <span className="chip" key={skill}>
                <span className="chip-dot" />
                {skill}
              </span>
            )
          )}
        </div>

        {/* Explore More — scrolls to WhatIDo section */}
        <a
          href="#whatido"
          className="about-nav-btn"
          onClick={scrollToNext}
          aria-label="Scroll to next section"
        >
          ↓ Explore More
        </a>
      </div>
    </section>
  );
};

export default About;
