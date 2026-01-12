import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cmsService } from '../services/cmsService';
import { ContentBlock } from '../types';
import { Link } from 'react-router-dom';
import { ArrowRight, Anchor, ShieldCheck, Truck, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const [content, setContent] = useState<ContentBlock[]>([]);

  useEffect(() => {
    cmsService.getData().then(data => setContent(data.content));
    const handleUpdate = () => {
      cmsService.getData().then(data => setContent(data.content));
    };
    window.addEventListener('cms-update', handleUpdate);
    return () => window.removeEventListener('cms-update', handleUpdate);
  }, []);

  const getText = (key: string) => {
    const block = content.find(c => c.section === 'home' && c.key === key);
    return block?.value[language] || '';
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] bg-[#0B1120] text-white flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=2070&auto=format&fit=crop" 
            alt="Marine background" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow" 
            style={{ animationDuration: '20s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120]/80 via-transparent to-[#0B1120]/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            Global Marine Solutions
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            {getText('hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
            {getText('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/about" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50">
              {t('nav.about')} <ArrowRight size={18} />
            </Link>
            <Link to="/contacts" className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded font-semibold transition-all duration-300 flex items-center justify-center">
              {t('nav.contacts')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Logos Strip */}
      <div className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholders for partner logos */}
              <div className="text-2xl font-black text-slate-400 tracking-tighter">VOLVO PENTA</div>
              <div className="text-2xl font-black text-slate-400 tracking-tighter">CATERPILLAR</div>
              <div className="text-2xl font-black text-slate-400 tracking-tighter">WARTSILA</div>
              <div className="text-2xl font-black text-slate-400 tracking-tighter">MAN ENERGY</div>
           </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose MarineParts</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Anchor, title: "Original Parts", desc: "Certified original spare parts from top global manufacturers direct to you." },
              { icon: Truck, title: "Global Logistics", desc: "Efficient shipping network reaching every major port worldwide." },
              { icon: ShieldCheck, title: "Quality Guarantee", desc: "Full warranty support and technical documentation for every component." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-10 rounded-lg shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
               <div className="absolute -top-4 -left-4 w-full h-full border-2 border-blue-100 rounded-lg z-0"></div>
               <img 
                src="https://images.unsplash.com/photo-1541452445037-97594dfc1e30?q=80&w=2070&auto=format&fit=crop" 
                alt="Engine" 
                className="rounded-lg shadow-2xl relative z-10 w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">{t('nav.about')}</span>
              <h2 className="text-4xl font-bold mb-8 text-slate-900 leading-tight">Excellence in Marine Engineering</h2>
              <div className="prose prose-slate prose-lg text-slate-600 mb-8">
                {getText('about_teaser')}
              </div>
              <Link to="/about" className="group inline-flex items-center gap-2 text-slate-900 font-bold border-b-2 border-blue-600 pb-1 hover:text-blue-600 transition-colors">
                {t('btn.readMore')} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to optimize your fleet?</h2>
            <p className="text-slate-400 mb-8 text-lg">Contact our sales team today for a personalized quote.</p>
             <Link to="/contacts" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded font-bold shadow-lg shadow-blue-900/50 transition-all">
               Get in Touch
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;