const Hero = () => {
  return (
    <section
      id="hero-section"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Hero Content */}
      <div className="flex flex-col items-center text-center">

        {/* Heading */}
        <h1
          className="
            text-[clamp(3.5rem,8vw,7rem)]
            font-bold
            leading-[0.9]
            tracking-[-0.04em]
          "
        >
          <span className="block">
            say hello to your
          </span>

          <span className="block">
            {/* Gradient Creative */}
            <span
              className="
                mr-3
                bg-[linear-gradient(90deg,rgb(15,214,217)_0%,rgb(67,229,216)_24%,rgb(124,241,212)_46%,rgb(107,231,233)_68%,rgb(77,184,255)_100%)]
                bg-[length:300%_300%]
                bg-clip-text
                font-[var(--font-telma)]
                italic
                text-transparent
                [animation:gradient-shift_7s_ease-in-out_infinite]
              "
            >
              creative
            </span>

            <span>
              developer
            </span>
          </span>
        </h1>
      </div>

      {/* Scroll Hint */}
      <div
        className="
          absolute
          bottom-[25%]
          left-1/2
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-3
        "
      >
        {/* Animations */}
        <style>
          {`
            @keyframes gradient-shift {
              0% {
                background-position: 0% 0%;
              }

              50% {
                background-position: 100% 100%;
              }

              100% {
                background-position: 0% 0%;
              }
            }

            @keyframes scrollBounce {
              0%, 100% {
                transform: translateY(0);
                opacity: 0.4;
              }

              50% {
                transform: translateY(8px);
                opacity: 1;
              }
            }

            @keyframes textFade {
              0%, 100% {
                opacity: 0.3;
              }

              50% {
                opacity: 0.7;
              }
            }
          `}
        </style>

        {/* Have a look */}
        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-white/70
            [animation:textFade_2.2s_ease-in-out_infinite]
          "
        >
          Have a look
        </span>

        {/* Mouse */}
        <div
          className="
            flex
            flex-col
            items-center
            [animation:scrollBounce_2.2s_ease-in-out_infinite]
          "
        >
          <svg
            width="18"
            height="28"
            viewBox="0 0 18 28"
            fill="none"
          >
            {/* Mouse body */}
            <rect
              x="1.5"
              y="1.5"
              width="15"
              height="25"
              rx="7.5"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
            />

            {/* Scroll wheel */}
            <rect
              x="7.5"
              y="5"
              width="3"
              height="6"
              rx="1.5"
              fill="rgb(0,229,204)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;