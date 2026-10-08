const Button = () => {
    return (
        <button
            aria-label="Scroll to top"
            className="fixed bottom-14 right-6 z-50
                        md:bottom-6
                        w-11 h-11
                        flex items-center justify-center
                        rounded-full border backdrop-blur-sm
                        transition-all duration-300
                        group
                        bg-white/5
                        border-white/10
                        text-primary
                        hover:bg-white/10
                        hover:border-cyan-400/40
                        opacity-0
                        pointer-events-none">
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
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
};

export default Button;