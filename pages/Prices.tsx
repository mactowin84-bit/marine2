import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cmsService } from '../services/cmsService';
import { ContentBlock } from '../types';
import { Download, FileText, Search } from 'lucide-react';

const Prices: React.FC = () => {
  const { language, t } = useLanguage();
  const [content, setContent] = useState<ContentBlock[]>([]);

  useEffect(() => {
    cmsService.getData().then(data => setContent(data.content));
  }, []);

  const getText = (key: string) => {
    const block = content.find(c => c.section === 'prices' && c.key === key);
    return block?.value[language] || '';
  };

  return (
    <div className="min-h-screen bg-slate-50">
       <div className="bg-[#0B1120] text-white py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-2 block">Catalog</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('nav.prices')}</h1>
           <div className="w-24 h-1.5 bg-blue-600"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
             <p className="text-lg text-slate-600 max-w-xl">{getText('intro')}</p>
             <div className="flex gap-4">
                 <button className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded font-medium hover:bg-slate-200 transition">
                    <Search size={18} /> Search
                 </button>
                 <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition shadow-sm">
                    <Download size={18} /> Catalog PDF
                 </button>
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-5 font-bold text-slate-800 text-sm uppercase tracking-wide">Product Category</th>
                  <th className="p-5 font-bold text-slate-800 text-sm uppercase tracking-wide">Model</th>
                  <th className="p-5 font-bold text-slate-800 text-sm uppercase tracking-wide">Availability</th>
                  <th className="p-5 font-bold text-slate-800 text-sm uppercase tracking-wide text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Main Engines</td>
                  <td className="p-5 text-slate-600">Series X-200</td>
                  <td className="p-5"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">In Stock</span></td>
                  <td className="p-5 text-right"><button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Request Quote</button></td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Spare Parts</td>
                  <td className="p-5 text-slate-600">Filters Type A</td>
                  <td className="p-5"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">In Stock</span></td>
                  <td className="p-5 text-right"><button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Request Quote</button></td>
                </tr>
                 <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-5 font-medium text-slate-900">Turbochargers</td>
                  <td className="p-5 text-slate-600">TC-900</td>
                  <td className="p-5"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">On Order (2 weeks)</span></td>
                  <td className="p-5 text-right"><button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Request Quote</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prices;