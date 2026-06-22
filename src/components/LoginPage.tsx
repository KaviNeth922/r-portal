import React, { useState } from 'react';
import { Language, translations } from '../i18n/translations';

interface LoginPageProps {
  language: Language;
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ language, onLogin }) => {
  const t = translations[language];
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter username and password.');
      return;
    }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' }}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #4f8ef7 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', animation: 'float 10s ease-in-out infinite reverse' }} />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)', animation: 'float 12s ease-in-out infinite' }} />
      </div>

      {/* Glassmorphism card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* University Emblem Badge */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)', border: '3px solid rgba(255,255,255,0.2)' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
              <path d="M10 28 L20 10 L30 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M13 22 L27 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="20" cy="10" r="2" fill="#60a5fa" />
            </svg>
          </div>
        </div>

        <div className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)' }}>

          {/* Header gradient strip */}
          <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #1e40af, #3b82f6, #6366f1)' }} />

          <div className="px-10 pt-8 pb-10">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 leading-tight" style={{ fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter' : 'Inter' }}>
                {t.portalTitle}
              </h1>
              <p className="text-lg font-semibold text-blue-700 mt-1" style={{ fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter' : 'Inter' }}>
                {t.researchCouncil}
              </p>
              <p className="text-sm text-gray-500 mt-1 font-medium" style={{ fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter' : 'Inter' }}>
                {t.university}
              </p>
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            </div>

            {/* Login prompt */}
            <p className="text-center text-sm text-gray-500 mb-6" style={{ fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter' : 'Inter' }}>
              {t.loginPrompt}{' '}
              <a href="#" className="text-blue-600 font-medium hover:text-blue-800 underline underline-offset-2 transition-colors">
                {t.signUpNow}
              </a>
            </p>

            {/* Error */}
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 5v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter' : 'Inter' }}>
                  {t.username}
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M2 15c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium placeholder-gray-400 transition-all duration-200 outline-none"
                    style={{ fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter' : 'Inter' }}
                    placeholder="Enter your username"
                    onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700" style={{ fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter' : 'Inter' }}>
                    {t.password}
                  </label>
                  <a href="#" className="text-xs text-blue-500 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
                    style={{ fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter' : 'Inter' }}>
                    {t.forgotPassword}
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="3" y="8" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="9" cy="12" r="1.2" fill="currentColor" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium placeholder-gray-400 transition-all duration-200 outline-none"
                    style={{ fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter' : 'Inter' }}
                    placeholder="Enter your password"
                    onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                style={{
                  background: isLoading ? '#94a3b8' : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                  boxShadow: isLoading ? 'none' : '0 4px 15px rgba(59,130,246,0.4)',
                  fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter' : 'Inter'
                }}
                onMouseEnter={(e) => { if (!isLoading) (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(0)'; }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                      <path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Signing in...
                  </>
                ) : t.signIn}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-10 py-5 text-center border-t border-gray-100" style={{ background: '#f8fafc' }}>
            <p className="text-xs text-gray-400" style={{ fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter' : 'Inter' }}>
              {t.designedBy}{' '}
              <span className="font-semibold text-gray-600">{t.devUnit}</span>
              {' '}© 2025
            </p>
            <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: language === 'si' ? 'Noto Sans Sinhala, Inter' : 'Inter' }}>
              {t.needHelp}: <a href={`tel:${t.phone}`} className="text-blue-500 hover:text-blue-700 font-medium transition-colors">{t.phone}</a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
