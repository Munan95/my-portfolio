import { useEffect, useRef, useState } from "react";
import "./CodeStuckSection.css";

/* ---------- Config ---------- */
const TITLE = "and I stuck with it.";
const CODE_INTERVAL = 300; // a new code snippet appears every 1 seconds
const MAX_VISIBLE = 7; // oldest snippet fades out when this many are showing

// Syntax colours (Dracula-style)
const COLORS = {
  k: "#ff79c6", // keyword
  f: "#50fa7b", // function / name
  s: "#f1fa8c", // string
  p: "#bd93f9", // value
  c: "#8be9fd", // property
  t: "#f8f8f2", // plain text
  m: "#6272a4", // muted
  o: "#ffb86c", // orange
};

// show: "all" = every screen, "sm" = ≥640px, "md" = ≥768px
const SNIPPETS = [
  {
    pos: { top: "9%", left: "4%" }, show: "all", o: 0.6,
    lines: [
      [["f", "useEffect"], ["t", "(() => {"]],
      [["k", "  const "], ["t", "el = document."], ["c", "querySelector"], ["t", "("], ["s", "'.container'"], ["t", ")"]],
      [["t", "}, [])"]],
    ],
  },
  {
    pos: { top: "22%", left: "3%" }, show: "sm", o: 0.5,
    lines: [[["k", "import"], ["t", " { "], ["f", "useState"], ["t", " }"], ["k", " from "], ["s", "'react'"]]],
  },
  {
    pos: { top: "43%", left: "2%" }, show: "all", o: 0.55,
    lines: [[["s", '"use client"'], ["t", ";"]]],
  },
  {
    pos: { top: "62%", left: "5%" }, show: "sm", o: 0.5,
    lines: [[["k", "const "], ["t", "[open, setOpen]"], ["k", " = "], ["f", "useState"], ["t", "("], ["p", "false"], ["t", ")"]]],
  },
  {
    pos: { bottom: "22%", left: "5%" }, show: "sm", o: 0.55,
    lines: [[["t", "<"], ["k", "button"], ["t", ">Explore</"], ["k", "button"], ["t", ">"]]],
  },
  {
    pos: { bottom: "9%", left: "2%" }, show: "all", o: 0.5,
    lines: [[["c", "onClick"], ["t", "={"], ["f", "handleOpen"], ["t", "}"]]],
  },
  {
    pos: { bottom: "5%", left: "20%" }, show: "md", o: 0.5,
    lines: [[["c", "transition"], ["t", ": "], ["o", "all "], ["p", "0.3s "], ["f", "ease"], ["t", ";"]]],
  },
  {
    pos: { top: "8%", right: "5%" }, show: "md", o: 0.55,
    lines: [
      [["k", "interface "], ["f", "Props "], ["t", "{"]],
      [["c", "  children"], ["t", ": "], ["p", "ReactNode"]],
      [["t", "}"]],
    ],
  },
  {
    pos: { top: "24%", right: "4%" }, show: "sm", o: 0.6,
    lines: [[["k", "export default function "], ["f", "App"], ["t", "()"]]],
  },
  {
    pos: { top: "43%", right: "4%" }, show: "sm", o: 0.5,
    lines: [[["k", "type "], ["f", "Theme"], ["t", " = "], ["s", "'dark'"], ["m", " | "], ["s", "'light'"]]],
  },
  {
    pos: { top: "62%", right: "6%" }, show: "md", o: 0.5,
    lines: [[["k", "const "], ["t", "theme "], ["k", "= "], ["s", "'dark'"]]],
  },
  {
    pos: { bottom: "21%", right: "5%" }, show: "all", o: 0.55,
    lines: [[["t", "<"], ["k", "h1"], ["t", ">Headline</"], ["k", "h1"], ["t", ">"]]],
  },
  {
    pos: { bottom: "9%", right: "5%" }, show: "sm", o: 0.5,
    lines: [[["c", "ref"], ["t", "={"], ["f", "containerRef"], ["t", "}"]]],
  },
  {
    pos: { top: "5%", right: "20%" }, show: "md", o: 0.5,
    lines: [[["f", "ScrollTrigger"], ["t", "."], ["c", "create"], ["t", "({...})"]]],
  },
];

// Order snippets appear in – alternates left/right and top/bottom so the
// screen fills up evenly instead of one corner at a time.
const ORDER = [0, 8, 2, 11, 5, 9, 3, 13, 6, 1, 10, 12, 4, 7];

/* ---------- Component ---------- */
export default function CodeStuckSection() {
  const sectionRef = useRef(null);
  const cursorRef = useRef(0);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState([]); // snippet indexes currently visible

  // Detect when the section is entered / left
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

  // Reveal a new code snippet every 1 seconds while the section is in view.
  // (setState only happens inside timer callbacks, never synchronously in the
  // effect body, so the react-hooks/set-state-in-effect lint rule is satisfied.)
  useEffect(() => {
    if (!inView) return;

    cursorRef.current = 0;

    const reveal = (fresh) => {
      const idx = ORDER[cursorRef.current % ORDER.length];
      cursorRef.current += 1;
      setActive((prev) => {
        const base = fresh ? [] : prev; // start clean every time the section is entered
        const next = [...base.filter((i) => i !== idx), idx];
        return next.length > MAX_VISIBLE ? next.slice(next.length - MAX_VISIBLE) : next;
      });
    };

    const first = setTimeout(() => reveal(true), 0); // first one right away
    const id = setInterval(() => reveal(false), CODE_INTERVAL);

    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [inView]);

  // Split the title into words → letters (for per-letter animation)
  const words = TITLE.split(" ");
  let letterIndex = 0;

  return (
    <section ref={sectionRef} className="stuck">
      {/* Background code */}
      {SNIPPETS.map((s, i) => (
        <div
          key={i}
          className={`stuck__code stuck__code--${s.show} ${inView && active.includes(i) ? "is-on" : ""}`}
          style={{ ...s.pos, "--o": s.o }}
          aria-hidden="true"
        >
          {s.lines.map((line, li) => (
            <div className="stuck__line" key={li}>
              {line.map(([c, text], ti) => (
                <span key={ti} style={{ color: COLORS[c] }}>
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Title */}
      <h1 className={`stuck__title ${inView ? "is-in" : ""}`} aria-label={TITLE}>
        {words.map((word, wi) => (
          <span key={wi} aria-hidden="true">
            <span className="stuck__word">
              {[...word].map((ch, ci) => {
                const i = letterIndex++;
                return (
                  <span key={ci} className="stuck__char" style={{ "--i": i }}>
                    {ch}
                  </span>
                );
              })}
            </span>
            {wi < words.length - 1 && " "}
          </span>
        ))}
      </h1>
    </section>
  );
}
