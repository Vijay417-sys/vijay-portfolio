import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My Career <span>&</span> Experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* 1. Java Full-Stack Intern */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Java Full-Stack Intern</h4>
                <h5>Dhee Coding Lab, Bengaluru</h5>
              </div>
              <h3 className="career-duration">Present</h3>
            </div>
            <p>
              Currently working as a Java Full-Stack Intern at Dhee Coding Lab,
              Bengaluru. Developing scalable web applications using Core Java,
              J2EE, JDBC, Servlets, and Spring Boot. Building responsive user
              interfaces with React and integrating them with RESTful APIs while
              improving application performance and code quality.
            </p>
          </div>

          {/* 2. Design Engineer Intern */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Design Engineer Intern</h4>
                <h5>Well Made Locking System Pvt. Ltd.</h5>
              </div>
              <h3 className="career-duration">2022 – 2023</h3>
            </div>
            <p>
              Worked as a Design Engineer Intern, creating mould and press-tool
              components using SolidWorks and AutoCAD. Developed technical
              drawings and 3D models, collaborated with manufacturing teams, and
              gained practical experience in precision engineering, design
              optimization, and production processes.
            </p>
          </div>

          {/* 3. Education & Technical Skills */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Education &amp; Technical Skills</h4>
                <h5>Acharya Institute of Technology, Bengaluru</h5>
              </div>
              <h3 className="career-duration">2023 – 2026</h3>
            </div>
            <p>
              Completed Bachelor of Engineering in Computer Science and
              Engineering from Acharya Institute of Technology, Bengaluru
              (2026). Built a strong foundation in Data Structures, Algorithms,
              Object-Oriented Programming, Operating Systems, Database
              Management Systems, Computer Networks, and Software Engineering
              through academics and hands-on projects.
            </p>
          </div>

          {/* 4. DevOps & Cloud Learning */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps &amp; Cloud Learning</h4>
                <h5>Self-Learning &amp; Practice</h5>
              </div>
              <h3 className="career-duration">Ongoing</h3>
            </div>
            <p>
              Actively learning and implementing DevOps practices using Git,
              GitHub, Jenkins, Docker, and AWS. Gaining experience in version
              control, CI/CD pipelines, containerization, cloud deployment, and
              automation to support modern software development workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
