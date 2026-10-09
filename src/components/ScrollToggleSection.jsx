import { useEffect, useRef, useState } from "react";
import "./ScrollToggleSection.css";

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

/* ---------- Icons ---------- */
const SketchIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 38c-2-3 3-9 6-14 4-6 8-14 13-14 4 0 3 5 0 9-4 5-9 9-6 13 2 3 8 0 12-5" />
    <path d="M14 40c4 1 9-3 13-7" />
  </svg>
);

const DesignIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 38V12a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v1" />
    <path d="M8 16h14" />
    <path d="M16 16v22" />
    <path d="M26 24l16 6-6.5 2.5L33 39z" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 14L6 24l10 10" />
    <path d="M32 14l10 10-10 10" />
    <path d="M27 10l-6 28" />
  </svg>
);

const TABS = [
  { id: "sketch", label: "Sketch", Icon: SketchIcon },
  { id: "design", label: "Design", Icon: DesignIcon },
  { id: "code", label: "Code", Icon: CodeIcon },
];

export default function ScrollToggleSection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(1); // 1 = design (blue), 2 = code (green)
  const contentRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    let raf = null;

    const update = () => {
      raf = null;
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 → section pinned at top, 1 → end of pinned range
      const scrollable = rect.height - vh;
      const progress = clamp(-rect.top / scrollable, 0, 1);

      // Switch from "design" (blue) to "code" (green) after a small scroll
      setActive(progress >= 0.3 ? 2 : 1);

      // ---- Title: scroll-linked, based on where the title really is on screen ----
      // (center of the title as a fraction of the viewport height: 0 = top, 1 = bottom)
      const t = titleRef.current;
      const tr = t ? t.getBoundingClientRect() : rect;
      const cy = (tr.top + tr.height / 2) / vh;

      // APPEAR: fades in while the title travels from near the bottom up to the center
      const APPEAR_FROM = 0.95;
      const APPEAR_TO = 0.5;
      // HIDE: fades out while the title travels from the center up toward the top
      const HIDE_FROM = 0.5;
      const HIDE_TO = 0.1;

      const tIn = clamp((APPEAR_FROM - cy) / (APPEAR_FROM - APPEAR_TO), 0, 1);
      const tOut = clamp((HIDE_FROM - cy) / (HIDE_FROM - HIDE_TO), 0, 1);

      const c = contentRef.current;
      if (c) {
        c.style.setProperty("--in1", tIn.toFixed(3));
        c.style.setProperty("--in2", clamp((tIn - 0.2) / 0.8, 0, 1).toFixed(3)); // 2nd line follows slightly later
        c.style.setProperty("--out", tOut.toFixed(3));
      }
    };

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const stage = active === 2 ? "code" : "design";

  return (
    <section ref={sectionRef} className="sts" data-stage={stage}>
      <div className="sts__sticky">
        <div className="sts__content" ref={contentRef}>
          {/* Toggle */}
          <div className="sts__toggle" role="tablist" aria-label="Workflow stage">
            <span
              className="sts__indicator"
              style={{ transform: `translateX(${active * 100}%)` }}
              aria-hidden="true"
            />
            {TABS.map(({ id, label, Icon }, i) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={label}
                tabIndex={-1}
                className={`sts__tab ${active === i ? "is-active" : ""}`}
              >
                <Icon />
              </button>
            ))}
          </div>

          {/* Title */}
          <h2 className="sts__title" ref={titleRef}>
            <span className="sts__line">I started building</span>
            <span className="sts__line">what I design</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
