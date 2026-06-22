import React, { useState } from 'react';
import { Language } from './i18n/translations';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import ReportForm from './components/ReportForm';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'si' : 'en');

  return (
    <div className="min-h-screen" style={{ fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter, sans-serif' : 'Inter, sans-serif' }}>
      {/* Language toggle always visible top-right */}
      {!isLoggedIn && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1.5px solid rgba(30,64,175,0.2)',
              color: '#1e40af',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter, sans-serif' : 'Inter, sans-serif'
            }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="#1e40af" strokeWidth="1.3" />
              <path d="M8 1.5 C6 4 6 12 8 14.5" stroke="#1e40af" strokeWidth="1" />
              <path d="M8 1.5 C10 4 10 12 8 14.5" stroke="#1e40af" strokeWidth="1" />
              <path d="M1.5 6h13M1.5 10h13" stroke="#1e40af" strokeWidth="1" />
            </svg>
            {language === 'en' ? 'සිංහල' : 'English'}
          </button>
        </div>
      )}

      {isLoggedIn ? (
        <div className="min-h-screen" style={{ background: '#f1f5f9' }}>
          <Navbar
            language={language}
            onToggleLanguage={toggleLanguage}
            onLogout={() => setIsLoggedIn(false)}
          />
          <main>
            <ReportForm language={language} />
          </main>
        </div>
      ) : (
        <LoginPage language={language} onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default App;
