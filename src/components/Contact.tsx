import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:hosapetivijay18@gmail.com" data-cursor="disable">
                hosapetivijay18@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+919483069267" data-cursor="disable">
                +91 94830 69267
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Vijay417-sys"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/vijay-hosapeti-7b48b9364/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://unstop.com/u/vijayhos5193"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Unstop <MdArrowOutward />
            </a>
            <a
              href="https://vijayshportfolio.netlify.app"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Portfolio <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Vijay Hosapeti</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>

        {/* ── Footer bar ── */}
        <div className="contact-footer-bar">
          <span className="footer-copy">
            © 2026 All rights reserved.
          </span>
          <span className="footer-name">
            Built by <span>Vijay Hosapeti</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
