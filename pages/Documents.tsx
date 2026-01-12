import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cmsService } from '../services/cmsService';
import { DocumentItem } from '../types';
import { FileText, Calendar, Download, ChevronRight } from 'lucide-react';

const Documents: React.FC = () => {
  const { language, t } = useLanguage();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    cmsService.getData().then(data => setDocuments(data.documents));
  }, []);

  const publishedDocs = documents.filter(doc => doc.isPublished);

  return (
    <div className="min-h-screen bg-slate-50">
       <div className="bg-[#0B1120] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-2 block">Resources</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('nav.documents')}</h1>
          <div className="w-24 h-1.5 bg-blue-600"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedDocs.map(doc => (
            <div key={doc.id} className="bg-white rounded-lg shadow-sm hover:shadow-xl border border-slate-200 overflow-hidden group flex flex-col transition-all duration-300">
              <div className="h-48 bg-slate-100 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                 {/* Icon fallback if no image */}
                 <FileText className="w-16 h-16 text-slate-300 group-hover:scale-110 transition duration-500" />
                 <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded shadow text-xs font-bold text-slate-600 uppercase">PDF</div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-2 text-xs text-blue-600 font-bold uppercase tracking-wider mb-3">
                  <Calendar size={12} />
                  {doc.publishDate}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {doc.title[language]}
                </h3>
                <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">
                  {doc.description[language]}
                </p>
                <a 
                  href="#" 
                  className="flex items-center justify-between w-full bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-4 py-3 rounded border border-slate-200 hover:border-blue-200 transition-all font-semibold text-sm"
                >
                  <span className="flex items-center gap-2"><Download size={16} /> {t('btn.download')}</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;