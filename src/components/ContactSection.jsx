import { useEffect, useRef, useState } from "react";
import "./ContactSection.css";

/* ---------- Config ---------- */
const EMAIL = "emilian.misera@gmail.com";

// Delays (ms) after the section is entered
const DELAY = {
  lets: 100, // "Let's" starts after 1s
  line2: 200, // "something together." starts 1s later
};
const STAGGER = 20; // delay between letters, same for both lines (ms)
const STAGGERR = 40; // delay between letters, same for both lines (ms)
const LETS = "Let's";
const LINE2 = ["something", "together."];

/* ---------- Component ---------- */
export default function ContactSection() {
  const sectionRef = useRef(null);
  const linkRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Enter / leave detection
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Magnetic hover effect for the Contact button
  const onMove = (e) => {
    const link = linkRef.current;
    if (!link) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.25;
    link.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const onLeave = () => {
    if (linkRef.current) linkRef.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <section ref={sectionRef} className={`contact ${inView ? "is-in" : ""}`} data-nav-theme="light">
      <p className="contact__title">
        {/* Line 1: "Let's" is never hidden – on each letter's turn it fades + rises like line 2 */}
        <span className="contact__line">
          <span className="contact__word" aria-label={LETS}>
            {[...LETS].map((ch, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="contact__char contact__lchar"
                style={{ "--d": `${DELAY.lets + i * STAGGER}ms` }}
              >
                {ch}
              </span>
            ))}
          </span>
          <span className="contact__word contact__gradient">create</span>
        </span>

        {/* Line 2: letters rise in one after another (blur → sharp) */}
        <span className="contact__line" aria-label={LINE2.join(" ")}>
          {(() => {
            let count = 0; // letters placed so far, for the stagger
            return LINE2.map((word, wi) => (
              <span key={wi} className="contact__word" aria-hidden="true">
                {[...word].map((ch, ci) => {
                  const delay = DELAY.line2 + count++ * STAGGERR;
                  return (
                    <span
                      key={ci}
                      className="contact__char contact__reveal"
                      style={{ "--d": `${delay}ms` }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            ));
          })()}
        </span>
      </p>

      {/* Button – always visible */}
      <div className="contact__btn-wrap" onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className="contact__btn-outline" aria-hidden="true" />
        <a ref={linkRef} href={`mailto:${EMAIL}`} className="contact__btn">
          Contact
        </a>
      </div>
    </section>
  );
}
