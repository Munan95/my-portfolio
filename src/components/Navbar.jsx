import { useEffect, useState } from "react";

// The colors switch once the black CodeStuckSection has completely passed the navbar,
// i.e. the white section's top edge reaches this many px from the top of the screen.
//   0  = after the code section has fully passed the navbar (current)
//   40 = when the white section reaches the middle of the navbar
//   64 = as soon as the white section reaches the bottom of the navbar
const NAV_Y = 0;

const Navbar = () => {
  // true while the navbar is on top of a section marked data-nav-theme="light"
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const update = () => {
      const lightSections = document.querySelectorAll('[data-nav-theme="light"]');
      let light = false;
      lightSections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= NAV_Y && r.bottom > NAV_Y) light = true;
      });
      setOnLight(light);
    };

    const raf = requestAnimationFrame(update); // initial check
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const linkClass = onLight
    ? "text-black hover:bg-black/10 hover:outline-black/15"
    : "text-white hover:bg-white/10 hover:outline-white/15";

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-6 md:px-16">
      <nav className="hidden md:flex w-full pt-4 justify-between items-center">
        <a href="/#hero-section">
          <img src="/src/assets/IMG/logo.png" alt="Logo" className="h-12" />
        </a>

        <div
          className={`h-[2px] flex-1 rounded-full mx-16 transition-colors duration-300 ${
            onLight ? "bg-black/10" : "bg-white/20"
          }`}
        />

        <div className="flex gap-12">
          <a
            className={`px-2 py-2 rounded-lg outline-[1px] outline-transparent transition-all duration-300 ${linkClass}`}
            href="/#selected-work-selection"
          >
            work
          </a>
          <a
            className={`px-2 py-2 rounded-lg outline-[1px] outline-transparent transition-all duration-300 ${linkClass}`}
            href="/#selected-work-selection"
          >
            Resume
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
