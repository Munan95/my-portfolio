import { useEffect, useRef, useState } from "react";

const CreativePhase = () => {
    const [showComment, setShowComment] = useState(false);
    const commentSectionRef = useRef(null);

    useEffect(() => {
        let showTimer;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Section entered → wait 500ms → show
                    showTimer = setTimeout(() => {
                        setShowComment(true);
                    }, 100);
                } else {
                    // Section left → hide immediately
                    clearTimeout(showTimer);
                    setShowComment(false);
                }
            },
            {
                threshold: 0.5,
            }
        );

        if (commentSectionRef.current) {
            observer.observe(commentSectionRef.current);
        }

        return () => {
            clearTimeout(showTimer);
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={commentSectionRef}
            id="creative-phase"
            className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-24 bg-black"
        >

            {/* ================= COMMENT BOX ================= */}
            <div
                className={`
                    absolute bottom-[48%] left-[35%]
                    z-20
                    hidden md:block
                    transition-all duration-700 ease-out
                    ${showComment
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-8 opacity-0"
                    }
                `}
            >
                <div className="w-[500px] min-h-[50px]">

                    {/* Comment */}
                    <div
                        className="
                            absolute bottom-0 left-0
                            h-[198px] w-[500px]
                            overflow-hidden
                            rounded-[16px_16px_16px_4px]
                            border border-white/10
                            bg-[#202020]/90
                            backdrop-blur-md
                            shadow-2xl
                        "
                    >
                        <div className="box-border w-[468px] px-4 py-3.5">

                            <div className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                                <span className="text-[13px] font-medium tracking-[0.01em] text-white/65 md:text-[16px]">
                                    Morshed
                                </span>

                                <span className="text-[13px] text-white/30 md:text-[16px]">
                                    3 years ago
                                </span>
                            </div>

                            <p className="m-0 text-[18px] font-medium leading-[1.35] text-white md:text-[32px] md:leading-[1.15]">
                                I started programming, focusing on data structure
                                and algorithm.
                            </p>
                        </div>
                    </div>

                    {/* Cursor + Name */}
                    <div className="absolute left-5 top-15 z-50">

                        <div className="relative inline-flex bg-transparent">

                            {/* Cursor SVG */}
                            <div className="absolute -left-[10px] -top-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="23"
                                    height="28"
                                    viewBox="0 0 23 28"
                                    fill="none"
                                >
                                    <path
                                        d="M10.7139 15.4972L5.71387 25.4972L0.713867 0.997192L21.2139 12.9972L10.7139 15.4972Z"
                                        fill="#810ca2"
                                        stroke="white"
                                    />
                                </svg>
                            </div>

                            {/* Name */}
                            <span
                                className="
                                    relative z-10
                                    whitespace-nowrap
                                    rounded-full
                                    px-3 py-1
                                    text-[14px]
                                    text-white
                                    shadow-lg
                                "
                                style={{
                                    backgroundColor: "#810ca2",
                                }}
                            >
                                Morshed
                            </span>

                        </div>
                    </div>
                </div>
            </div>


            {/* ================= SVG GRID ================= */}
            <div
                className="
                    relative z-10
                    grid w-full max-w-85
                    grid-cols-2
                    items-center justify-items-center
                    gap-x-6 gap-y-10

                    sm:max-w-2xl
                    sm:grid-cols-4
                    sm:gap-x-10 sm:gap-y-14

                    md:max-w-4xl
                    md:gap-x-14 md:gap-y-20
                "
            >

                {/* SVG 1 */}
                <div className="group flex h-28.75 w-25 items-center justify-center sm:h-37 sm:w-32.5 md:h-45.5 md:w-40">
                    <img
                        src="/src/assets/SVG/creative-1.svg"
                        alt="Creative illustration"
                        className="h-full w-full object-contain"
                    />
                </div>

                {/* SVG 2 */}
                <div className="group flex h-28.75 w-25 items-center justify-center sm:h-37 sm:w-32.5 md:h-45.5 md:w-40">
                    <img
                        src="/src/assets/SVG/creative-1.svg"
                        alt="Creative illustration"
                        className="h-full w-full object-contain"
                    />
                </div>

                {/* SVG 3 */}
                <div className="group flex h-28.75 w-25 items-center justify-center sm:h-37 sm:w-32.5 md:h-45.5 md:w-40">
                    <img
                        src="/src/assets/SVG/creative-1.svg"
                        alt="Creative illustration"
                        className="h-full w-full object-contain"
                    />
                </div>

                {/* SVG 4 */}
                <div className="group flex h-28.75 w-25 items-center justify-center sm:h-37 sm:w-32.5 md:h-45.5 md:w-40">
                    <img
                        src="/src/assets/SVG/creative-1.svg"
                        alt="Creative illustration"
                        className="h-full w-full object-contain"
                    />
                </div>

                {/* SVG 5 */}
                <div className="group flex h-28.75 w-25 items-center justify-center sm:h-37 sm:w-32.5 md:h-45.5 md:w-40">
                    <img
                        src="/src/assets/SVG/creative-1.svg"
                        alt="Creative illustration"
                        className="h-full w-full object-contain"
                    />
                </div>

                {/* SVG 6 */}
                <div className="group flex h-28.75 w-25 items-center justify-center sm:h-37 sm:w-32.5 md:h-45.5 md:w-40">
                    <img
                        src="/src/assets/SVG/creative-1.svg"
                        alt="Creative illustration"
                        className="h-full w-full object-contain"
                    />
                </div>

                {/* SVG 7 */}
                <div className="group flex h-28.75 w-25 items-center justify-center sm:h-37 sm:w-32.5 md:h-45.5 md:w-40">
                    <img
                        src="/src/assets/SVG/creative-1.svg"
                        alt="Creative illustration"
                        className="h-full w-full object-contain"
                    />
                </div>

                {/* SVG 8 */}
                <div className="group flex h-28.75 w-25 items-center justify-center sm:h-37 sm:w-32.5 md:h-45.5 md:w-40">
                    <img
                        src="/src/assets/SVG/creative-1.svg"
                        alt="Creative illustration"
                        className="h-full w-full object-contain"
                    />
                </div>

            </div>
        </section>
    );
};

export default CreativePhase;