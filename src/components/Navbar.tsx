import React from 'react';
import { Language, translations } from '../i18n/translations';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, onToggleLanguage, onLogout }) => {
  const t = translations[language];
  const fontFamily = language === 'si' ? 'Noto Sans Sinhala, Inter, sans-serif' : 'Inter, sans-serif';

  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ background: 'linear-gradient(90deg, #0f172a 0%, #1e3a5f 60%, #1e40af 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                <path d="M4 13 L9 4 L14 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M6 10 L12 10" stroke="white" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm sm:text-base tracking-wide" style={{ fontFamily }}>
              USJ – Research Council – Researcher Portal
            </span>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: 'white',
                fontFamily,
                backdropFilter: 'blur(4px)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
              title="Switch Language"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7 1 C5 3 5 11 7 13" stroke="currentColor" strokeWidth="1" />
                <path d="M7 1 C9 3 9 11 7 13" stroke="currentColor" strokeWidth="1" />
                <path d="M1.5 5h11M1.5 9h11" stroke="currentColor" strokeWidth="1" />
              </svg>
              {t.switchLanguage}
            </button>

            {/* User greeting - hidden on small screens */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="4" r="2.2" stroke="white" strokeWidth="1.2" />
                  <path d="M1.5 10c0-2.21 2.015-4 4.5-4s4.5 1.79 4.5 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-xs font-medium leading-none" style={{ fontFamily }}>
                  {t.greetingPrefix} Prof. KB.G.S.K.Gamlath
                </span>
                <span className="text-blue-300 text-xs leading-none mt-0.5" style={{ fontSize: '10px' }}>
                  16/22/2026 | 10:04:42 AM
                </span>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                background: 'rgba(239,68,68,0.15)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#fca5a5',
                fontFamily
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.28)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.15)')}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2H2.5A1.5 1.5 0 0 0 1 3.5v7A1.5 1.5 0 0 0 2.5 12H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M9.5 4.5L12.5 7l-3 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.5 7H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              {t.logout}
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5">
          <div className="flex items-center gap-1.5 text-xs" style={{ fontFamily }}>
            <a href="#" className="text-blue-300 hover:text-blue-100 transition-colors font-medium">{t.navHome}</a>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3 2l4 3-4 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <a href="#" className="text-blue-300 hover:text-blue-100 transition-colors font-medium">{t.navGrantDetails}</a>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3 2l4 3-4 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-white font-semibold">{t.navSubmitReport}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
