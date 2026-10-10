import { useEffect, useRef, useState } from "react";
import "./ScrollToTopButton.css";

/* ---------- Config ---------- */
const SHOW_AFTER = 300; // px scrolled before the button appears

export default function ScrollToTopButton() {
  const btnRef = useRef(null);
  const [visible, setVisible] = useState(() => window.scrollY > SHOW_AFTER);
  // true while the button sits on top of a section marked data-nav-theme="light"
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > SHOW_AFTER);

      // Same idea as the Navbar: is a light (white) section behind the button's center?
      const btn = btnRef.current;
      if (!btn) return;
      const b = btn.getBoundingClientRect();
      const y = b.top + b.height / 2;
      let light = false;
      document.querySelectorAll('[data-nav-theme="light"]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) light = true;
      });
      setOnLight(light);
    };

    const raf = requestAnimationFrame(update); // initial check
    window.addEventListener("scroll", update, { passive: true, capture: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      ref={btnRef}
      type="button"
      aria-label="Scroll to top"
      className={`totop ${visible ? "is-visible" : ""} ${onLight ? "is-light" : ""}`}
      onClick={scrollToTop}
      tabIndex={visible ? 0 : -1}
    >
      <svg
        className="totop__icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 13V3M3 8l5-5 5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
