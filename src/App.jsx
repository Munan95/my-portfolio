import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Button from "./components/Button";
import CreativePhase from "./components/CreativePhase";
import BuildingDesign from "./components/BuildingDesign";

const App = () => {

  return (
    <div className="flex flex-col min-h-screen w-full bg-black">
      <Navbar />
      <Hero />
      <Button />
      <CreativePhase />
      <BuildingDesign />
    </div>
  );
};

export default App;
