import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STROKE = "#8D8D8D";

/* Wrapper that positions each wireframe shape */
function Floating({ className = "", style, children }) {
  return (
    <div
      data-shape
      className={`pointer-events-none absolute opacity-0 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default function UiUxHero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set("[data-col]", { scaleY: 1 });
        gsap.set("[data-shape], [data-corner]", { opacity: 1 });
        gsap.set("[data-draw]", { strokeDashoffset: 0 });
        gsap.set("[data-title]", { scale: 1 });
        return;
      }

      // --- initial states ---
      // normalise every outline to length 1 so scrubbing draws it evenly
      gsap.utils.toArray("[data-draw]").forEach((el) => el.setAttribute("pathLength", "1"));
      gsap.set("[data-draw]", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("[data-col]", { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set("[data-corner]", { opacity: 0 });
      gsap.set("[data-title], [data-shape]", { scale: 1, transformOrigin: "50% 50%" });

      // 1) Time-based intro: columns (slow), shapes fade-in, corner handles.
      //    Plays on entering the section, resets on leaving it.
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play reset play reset",
        },
      });

      intro
        .to("[data-col]", { scaleY: 1, duration: 3, stagger: 0.20, ease: "power2.out" }, 0) // slow
        .to("[data-shape]", { opacity: 1, duration: 0.5, stagger: 0.3 }, 0)
        .to("[data-corner]", { opacity: 1, duration: 0.7, stagger: 0.08 }, 0);

      // 2) Scroll-linked outline drawing: finished when the section's middle
      //    reaches the middle of the screen. Scrolling back up un-draws it.
      gsap.to("[data-draw]", {
        strokeDashoffset: 0,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 60%",
          end: "center center",
          scrub: true,
        },
      });

      // 3) Scroll-linked scale: 1 -> 0.5 while scrolling down past the middle,
      //    back to 1 when scrolling up.
      gsap.to("[data-title], [data-shape]", {
        scale: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Background columns */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-8 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} data-col className="h-full origin-top bg-red-900/15" />
        ))}
      </div>

      {/* Image placeholder (box with diagonals) */}
      <Floating style={{ top: "5%", left: "-1%", width: "clamp(70px, 9vw, 150px)" }}>
        <svg width="100%" viewBox="0 0 185 324" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="clip_img">
              <rect x="-141" y="0.46" width="325.38" height="322.83" fill="white" />
            </clipPath>
          </defs>
          <g clipPath="url(#clip_img)">
            <line
              data-draw
              y1="-2"
              x2="458.216"
              y2="-2"
              transform="matrix(0.710046 0.704156 -0.349095 0.937087 -141 0.461914)"
              stroke={STROKE}
              strokeWidth="4"
            />
            <line
              data-draw
              y1="-2"
              x2="458.207"
              y2="-2"
              transform="matrix(0.708285 -0.705927 0.351963 0.936014 -140.542 323.462)"
              stroke={STROKE}
              strokeWidth="4"
            />
          </g>
          <rect
            data-draw
            x="-138.997"
            y="2.459"
            width="321.382"
            height="318.827"
            stroke={STROKE}
            strokeWidth="4"
          />
        </svg>
      </Floating>

      {/* Input field placeholder */}
      <Floating style={{ top: "8%", left: "30%", width: "clamp(140px, 22vw, 340px)" }}>
        <svg width="100%" viewBox="0 0 528 94" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            data-draw
            x="1.5"
            y="2.25"
            width="524"
            height="90"
            rx="8.94"
            stroke={STROKE}
            strokeWidth="3"
          />
        </svg>
      </Floating>

      {/* Radio buttons + checkboxes */}
      <Floating style={{ bottom: "20%", left: "65%", width: "clamp(90px, 11vw, 160px)" }}>
        <svg width="100%" viewBox="0 0 178 166" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* checkboxes */}
          <rect
            data-draw
            x="8.94"
            y="103.49"
            width="53.57"
            height="53.57"
            rx="5.95"
            stroke={STROKE}
            strokeWidth="5.95"
          />
          <rect
            data-draw
            x="114.89"
            y="103.37"
            width="53.57"
            height="53.57"
            rx="5.95"
            stroke={STROKE}
            strokeWidth="5.95"
          />
          {/* check mark */}
          <path
            d="M31.31 137.322L51.798 116.774L54.961 119.925L31.319 143.635L17.094 129.45L20.246 126.289L31.31 137.322Z"
            fill={STROKE}
          />
          {/* radio: selected */}
          <circle cx="36.1" cy="30.1" r="27" stroke={STROKE} strokeWidth="5" data-draw />
          <circle cx="36.1" cy="30.1" r="12.5" fill={STROKE} />
          {/* radio: empty */}
          <circle cx="141.7" cy="30" r="27" stroke={STROKE} strokeWidth="5" data-draw />
        </svg>
      </Floating>

      {/* Pill button */}
      <Floating style={{ bottom: "18%", left: "20%", width: "clamp(120px, 16vw, 240px)" }}>
        <svg width="100%" viewBox="0 0 387 93" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            data-draw
            x="1.5"
            y="1.5"
            width="382.932"
            height="88.99"
            rx="44.5"
            stroke={STROKE}
            strokeWidth="3"
          />
        </svg>
      </Floating>

      {/* Card / list placeholder */}
      <Floating style={{ top: "28%", right: "5%", width: "clamp(110px, 16vw, 260px)" }}>
        <svg width="100%" viewBox="0 0 391 271" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect data-draw x="1" y="1" width="389" height="268.532" rx="12.04" stroke={STROKE} strokeWidth="2" />
          <rect data-draw x="2.5" y="2.5" width="386" height="87.844" stroke={STROKE} />
          <rect data-draw x="2.5" y="91.344" width="386" height="87.844" stroke={STROKE} />
          <rect data-draw x="2.5" y="180.188" width="386" height="87.844" stroke={STROKE} />
        </svg>
      </Floating>

      {/* Title with selection-style corner handles */}
      <div className="relative z-10 px-4 text-center">
        <div data-title className="relative inline-block">
          <span data-corner className="absolute -top-1 -left-1 z-50 h-[9px] w-[9px] bg-white" />
          <span data-corner className="absolute -top-1 -right-1 z-50 h-[9px] w-[9px] bg-white" />
          <span data-corner className="absolute -bottom-1 -left-1 z-50 h-[9px] w-[9px] bg-white" />
          <span data-corner className="absolute -right-1 -bottom-1 z-50 h-[9px] w-[9px] bg-white" />

          <h1 className="flex flex-col gap-2 border border-blue-400 p-2 text-4xl font-bold text-white md:text-7xl">
            <span>Then I discovered UI/UX</span>
            <span>- and loved it.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
