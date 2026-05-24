import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import ProjectCards from "./components/ProjectCards";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

function App() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Hero />
      <Timeline />
      <ProjectCards />
      <Skills />
      <Contact />
    </main>
  );
}

export default App;
