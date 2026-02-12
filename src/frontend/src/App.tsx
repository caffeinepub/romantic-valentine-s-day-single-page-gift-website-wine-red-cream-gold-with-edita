import { HeroSection } from './components/valentine/HeroSection';
import { LoveLetterSection } from './components/valentine/LoveLetterSection';
import { MemoriesSection } from './components/valentine/MemoriesSection';
import { ReasonsSection } from './components/valentine/ReasonsSection';
import { ClosingSection } from './components/valentine/ClosingSection';
import { Footer } from './components/valentine/Footer';
import { PublishDraftBar } from './components/admin/PublishDraftBar';
import { useAdminTokenFromHash } from './hooks/useAdminTokenFromHash';

function App() {
  const adminToken = useAdminTokenFromHash();
  const isAdminMode = !!adminToken;

  return (
    <div className="min-h-screen">
      {isAdminMode && <PublishDraftBar />}
      <div className={isAdminMode ? 'pt-16' : ''}>
        <HeroSection />
        <LoveLetterSection />
        <MemoriesSection />
        <ReasonsSection />
        <ClosingSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
