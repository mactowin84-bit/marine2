import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cmsService } from '../services/cmsService';
import { LicenseItem, LicenseCategory } from '../types';
import { Award, CheckCircle } from 'lucide-react';

const Licenses: React.FC = () => {
  const { language, t } = useLanguage();
  const [items, setItems] = useState<LicenseItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  useEffect(() => {
    cmsService.getData().then(data => setItems(data.licenses));
  }, []);

  const visibleItems = items.filter(item => item.isVisible);
  const filteredItems = activeCategory === 'ALL' 
    ? visibleItems 
    : visibleItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50">
       <div className="bg-[#0B1120] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-2 block">Compliance</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('nav.licenses')}</h1>
          <div className="w-24 h-1.5 bg-blue-600"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-200 pb-4">
          <button 
            onClick={() => setActiveCategory('ALL')}
            className={`px-6 py-2 rounded font-bold text-sm transition-all ${activeCategory === 'ALL' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            All Items
          </button>
          {Object.values(LicenseCategory).map(cat => (
             <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded font-bold text-sm transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              {cat}s
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group cursor-pointer text-center">
              <div className="aspect-[3/4] bg-slate-50 rounded mb-6 overflow-hidden relative border border-slate-100 flex items-center justify-center">
                 {/* Fallback visual */}
                 <Award className="w-16 h-16 text-slate-300 group-hover:text-blue-500 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                  <span className="text-white text-xs font-bold uppercase tracking-widest mb-1">View Full Size</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                 <CheckCircle className="w-4 h-4 text-green-500" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition">{item.title[language]}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Licenses;