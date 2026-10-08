const BuildingDesign = () => {
  return (
    <section
      className="
        relative
        flex
        min-h-screen
        w-full
        flex-col
        items-center
        justify-center
        overflow-hidden
        bg-black
        px-6
      "
    >
      {/* =====================================
          ICON CONTAINER
      ===================================== */}

      <div
        className="
          relative
          mb-8
          flex
          h-[158px]
          w-[490px]
          items-center
          justify-center
          rounded-[36px]
          border
          border-white/10
          bg-[#242424]
          shadow-[0_0_45px_rgba(0,180,255,0.25)]
        "
      >
        {/* Left Icon */}
        <div
          className="
            flex
            h-[130px]
            w-[130px]
            items-center
            justify-center
          "
        >
          <svg
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
          >
            <path
              d="M18 18C26 10 34 10 29 20C24 30 12 36 22 42C32 48 40 34 43 28C47 20 56 15 53 27C50 39 38 47 31 52"
              stroke="#e5e5e5"
              strokeWidth="5"
              strokeLinecap="round"
            />

            <path
              d="M27 20C34 13 40 13 37 21C34 29 25 33 31 38C36 42 43 34 47 29"
              stroke="#e5e5e5"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* =================================
            ACTIVE CENTER ICON
        ================================= */}

        <div
          className="
            flex
            h-[130px]
            w-[155px]
            items-center
            justify-center
            rounded-[28px]
            bg-[#101010]
          "
        >
          <svg
            width="76"
            height="76"
            viewBox="0 0 76 76"
            fill="none"
          >
            {/* F shape */}

            <path
              d="M24 52V19C24 17.9 24.9 17 26 17H55"
              stroke="#00AFFF"
              strokeWidth="5"
              strokeLinecap="round"
            />

            <path
              d="M25 31H50"
              stroke="#00AFFF"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Cursor */}

            <path
              d="M42 38L48 60L53 51L62 56L65 51L56 46L65 42L42 38Z"
              stroke="#00AFFF"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Right Code Icon */}

        <div
          className="
            flex
            h-[130px]
            w-[130px]
            items-center
            justify-center
          "
        >
          <svg
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
          >
            <path
              d="M25 20L12 35L25 50"
              stroke="#e5e5e5"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M45 20L58 35L45 50"
              stroke="#e5e5e5"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M40 16L30 54"
              stroke="#e5e5e5"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* =====================================
          HEADING
      ===================================== */}

      <h2
        className="
          max-w-[900px]
          text-center
          text-[clamp(3rem,7vw,6rem)]
          font-bold
          leading-[0.98]
          tracking-[-0.045em]
          text-white
        "
      >
        <span className="block">
          I started building
        </span>

        <span className="block">
          what I design
        </span>
      </h2>
    </section>
  );
};

export default BuildingDesign;