import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { GoldenVisaModal } from './components/GoldenVisaModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { DubaiBackground } from './components/DubaiBackground';

// Pages matching all 12 Figma screens
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { SellPropertyPage } from './pages/SellPropertyPage';
import { CommunitiesPage } from './pages/CommunitiesPage';
import { CommunityDetailPage } from './pages/CommunityDetailPage';
import { AgentProfilePage } from './pages/AgentProfilePage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'properties':
        return <PropertiesPage />;
      case 'property-detail':
        return <PropertyDetailPage />;
      case 'sell':
        return <SellPropertyPage />;
      case 'communities':
        return <CommunitiesPage />;
      case 'community-detail':
        return <CommunityDetailPage />;
      case 'agent':
        return <AgentProfilePage />;
      case 'dashboard':
        return <UserDashboardPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'not-found':
        return <NotFoundPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <DubaiBackground />
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <AuthModal />
      <GoldenVisaModal />
      <WhatsAppFloat />
    </div>
  );
};


export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
