
const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50 px-6 md:px-16">
            <nav className="hidden md:flex w-full pt-4 justify-between items-center">
                <a href="/#hero-section">
                    <img src="/src/assets/IMG/logo.png" alt="Logo" className="h-12" />
                </a>
                <div className="h-[1px] flex-1 rounded-full mx-16 bg-white/30">
                </div>
                <div className="flex gap-12">
                    <a className="px-2 py-2 rounded-lg outline-[1px] outline-transparent transition-all duration-200 text-white hover:bg-white/10 hover:outline-white/15"
                        href="/#selected-work-selection">
                        work
                    </a>
                    <a className="px-2 py-2 rounded-lg outline-[1px] outline-transparent transition-all duration-200 text-white hover:bg-white/10 hover:outline-white/15"
                        href="/#selected-work-selection">
                        Resume
                    </a>
                </div>
            </nav>
        </div>
    );
};

export default Navbar; 