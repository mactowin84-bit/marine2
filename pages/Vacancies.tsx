import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cmsService } from '../services/cmsService';
import { Vacancy } from '../types';
import { Briefcase, ArrowRight } from 'lucide-react';

const Vacancies: React.FC = () => {
  const { language, t } = useLanguage();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  useEffect(() => {
    cmsService.getData().then(data => setVacancies(data.vacancies));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
       <div className="bg-[#0B1120] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-2 block">Careers</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('nav.vacancies')}</h1>
          <div className="w-24 h-1.5 bg-blue-600"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-6 max-w-4xl mx-auto">
          {vacancies.filter(v => v.isVisible).map(vacancy => (
            <div key={vacancy.id} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{vacancy.title[language]}</h3>
                  <div className="flex items-center gap-4 mb-4">
                     <span className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded">
                        <Briefcase size={14} /> {vacancy.salary}
                     </span>
                     <span className="text-slate-400 text-sm">Full Time</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed max-w-xl">{vacancy.description[language]}</p>
                </div>
                <button className="whitespace-nowrap bg-slate-900 text-white px-8 py-3 rounded font-bold hover:bg-blue-600 transition-colors shadow-lg flex items-center gap-2 group-hover:gap-3">
                  Apply Now <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
          {vacancies.length === 0 && (
            <div className="text-center py-20 bg-white rounded border border-slate-200 border-dashed">
                <p className="text-slate-400">No open positions currently.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vacancies;