import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';
import { Ship, Menu, X, Globe, ChevronRight } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'nav.home' },
    { path: '/about', label: 'nav.about' },
    { path: '/prices', label: 'nav.prices' },
    { path: '/vacancies', label: 'nav.vacancies' },
    { path: '/documents', label: 'nav.documents' },
    { path: '/licenses', label: 'nav.licenses' },
    { path: '/contacts', label: 'nav.contacts' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <header className="bg-[#0B1120] text-white sticky top-0 z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-blue-600 p-2.5 rounded shadow-lg shadow-blue-900/20 group-hover:bg-blue-500 transition duration-300">
                <Ship className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider text-white">MARINE<span className="text-blue-500">PARTS</span></span>
                <span className="text-[10px] text-slate-400 tracking-[0.2em] uppercase">Global Supply Corp</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-sm ${
                    isActive(item.path)
                      ? 'text-blue-400 bg-slate-800/50'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                  }`}
                >
                  {t(item.label)}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-1 bg-slate-900/50 rounded-full p-1 border border-slate-700/50">
                <Globe className="w-3 h-3 ml-2 text-slate-500" />
                {[Language.KZ, Language.RU, Language.EN].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all duration-300 ${
                      language === lang
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-300 hover:text-white transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#0B1120] border-t border-slate-800 absolute w-full left-0 z-50 shadow-2xl">
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-bold uppercase tracking-widest flex items-center justify-between group ${
                    isActive(item.path) ? 'text-blue-400' : 'text-slate-400'
                  }`}
                >
                  {t(item.label)}
                  <ChevronRight size={16} className={`opacity-0 group-hover:opacity-100 transition ${isActive(item.path) ? 'opacity-100' : ''}`} />
                </Link>
              ))}
               <div className="flex gap-2 pt-6 border-t border-slate-800 mt-2">
                {[Language.KZ, Language.RU, Language.EN].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`flex-1 py-2 rounded text-xs font-bold uppercase border ${
                      language === lang
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1120] text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-1 space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600/20 p-2 rounded">
                   <Ship className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-lg font-bold text-white tracking-wide">MARINEPARTS</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                {language === Language.EN ? 'Your trusted partner in global marine logistics and spare parts supply. Quality certified.' : 'Сіздің теңіз логистикасы мен қосалқы бөлшектерді жеткізудегі сенімді серіктесіңіз.'}
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-3 text-sm">
                {navItems.slice(0, 4).map(item => (
                  <li key={item.path}><Link to={item.path} className="hover:text-blue-400 transition flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span> {t(item.label)}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Resources</h4>
               <ul className="space-y-3 text-sm">
                {navItems.slice(4).map(item => (
                  <li key={item.path}><Link to={item.path} className="hover:text-blue-400 transition flex items-center gap-2"><span className="w-1 h-1 bg-slate-600 rounded-full"></span> {t(item.label)}</Link></li>
                ))}
                <li><Link to="/admin" className="text-slate-600 hover:text-slate-500 transition flex items-center gap-2"><span className="w-1 h-1 bg-slate-700 rounded-full"></span> Admin Panel</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Contact</h4>
              <div className="space-y-4 text-sm">
                <div>
                   <p className="text-slate-500 text-xs uppercase mb-1">Headquarters</p>
                   <p className="text-white">Almaty, Abay Ave 10</p>
                </div>
                <div>
                   <p className="text-slate-500 text-xs uppercase mb-1">Support</p>
                   <p className="text-white">+7 777 123 45 67</p>
                   <p className="text-blue-400">info@marineparts.kz</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 gap-4">
            <p>&copy; {new Date().getFullYear()} MarineParts Corp. {t('footer.rights')}</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-slate-400">Privacy Policy</a>
                <a href="#" className="hover:text-slate-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;