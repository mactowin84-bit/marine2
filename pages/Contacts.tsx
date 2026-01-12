import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cmsService } from '../services/cmsService';
import { ContactInfo } from '../types';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contacts: React.FC = () => {
  const { language, t } = useLanguage();
  const [contacts, setContacts] = useState<ContactInfo | null>(null);

  useEffect(() => {
    cmsService.getData().then(data => setContacts(data.contacts));
  }, []);

  if (!contacts) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
       <div className="bg-[#0B1120] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-2 block">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('nav.contacts')}</h1>
          <div className="w-24 h-1.5 bg-blue-600"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div className="space-y-10">
            <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
                <p className="text-slate-600 mb-8">We are available 24/7 for your urgent marine supply needs.</p>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-blue-600 p-4 rounded text-white shadow-lg shadow-blue-600/20">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Office Address</h4>
                <p className="text-slate-900 text-xl font-medium">{contacts.address[language]}</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-blue-600 p-4 rounded text-white shadow-lg shadow-blue-600/20">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</h4>
                <p className="text-slate-900 text-xl font-medium font-mono">{contacts.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-blue-600 p-4 rounded text-white shadow-lg shadow-blue-600/20">
                <Mail size={24} />
              </div>
              <div>
                 <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</h4>
                <p className="text-slate-900 text-xl font-medium">{contacts.email}</p>
              </div>
            </div>
          </div>

          {/* Mapbox Container */}
          <div className="bg-white p-2 rounded-xl shadow-xl border border-slate-200">
            <div className="h-[600px] w-full bg-slate-100 rounded-lg overflow-hidden relative grayscale hover:grayscale-0 transition duration-500">
                <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${contacts.coordinates.lng-0.01}%2C${contacts.coordinates.lat-0.01}%2C${contacts.coordinates.lng+0.01}%2C${contacts.coordinates.lat+0.01}&layer=mapnik&marker=${contacts.coordinates.lat}%2C${contacts.coordinates.lng}`} 
                    style={{border: 0}}
                    title="Map"
                    className="w-full h-full"
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 text-xs font-mono rounded text-slate-600 shadow border border-slate-200">
                    {contacts.coordinates.lat.toFixed(6)}, {contacts.coordinates.lng.toFixed(6)}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;