import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Button from "./components/Button";
import CreativePhase from "./components/CreativePhase";
import UiUxHero from "./components/UiUxHero";
import ScrollToggleSection from "./components/ScrollToggleSection";
import CodeStuckSection from "./components/CodeStuckSection";

const App = () => {

  return (
    <div className="flex flex-col min-h-screen w-full bg-black">
      <Navbar />
      <Hero />
      <Button />
      <CreativePhase />
      <UiUxHero />
      <ScrollToggleSection />
      <CodeStuckSection />
    </div>
  );
};

export default App;
