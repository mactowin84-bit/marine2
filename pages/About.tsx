import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cmsService } from '../services/cmsService';
import { ContentBlock } from '../types';

const About: React.FC = () => {
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
    const block = content.find(c => c.section === 'about' && c.key === key);
    return block?.value[language] || '';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#0B1120] text-white py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-2 block">Company Profile</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('nav.about')}</h1>
          <div className="w-24 h-1.5 bg-blue-600"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div className="prose prose-lg prose-slate text-slate-600 leading-8">
             <p className="whitespace-pre-line">{getText('main_text')}</p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-slate-200 pt-8">
              <div>
                  <h4 className="text-4xl font-bold text-slate-900 mb-2">20+</h4>
                  <p className="text-slate-500 uppercase tracking-wide text-xs">Years Experience</p>
              </div>
              <div>
                  <h4 className="text-4xl font-bold text-slate-900 mb-2">500+</h4>
                  <p className="text-slate-500 uppercase tracking-wide text-xs">Global Partners</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;