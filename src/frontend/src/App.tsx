import { HeroSection } from './components/valentine/HeroSection';
import { LoveLetterSection } from './components/valentine/LoveLetterSection';
import { MemoriesSection } from './components/valentine/MemoriesSection';
import { ReasonsSection } from './components/valentine/ReasonsSection';
import { ClosingSection } from './components/valentine/ClosingSection';
import { Footer } from './components/valentine/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LoveLetterSection />
      <MemoriesSection />
      <ReasonsSection />
      <ClosingSection />
      <Footer />
    </div>
  );
}

export default App;
