import React, { useState, useEffect } from 'react';
import { cmsService } from '../../services/cmsService';
import { AppData, Language, DocumentItem, LicenseItem, ContentBlock, LicenseCategory, Vacancy } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Save, Plus, Trash2, Edit2, FileText, Award, Type, MapPin, Briefcase } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [data, setData] = useState<AppData | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'documents' | 'licenses' | 'vacancies' | 'contacts'>('content');
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const loadData = () => {
    cmsService.getData().then(setData);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!data) return <div className="p-10 text-center">Loading Admin Panel...</div>;

  const handleContentUpdate = async (id: string, key: string, val: string, lang: Language) => {
    const block = data.content.find(b => b.id === id);
    if (block) {
      const newValue = { ...block.value, [lang]: val };
      await cmsService.updateContent(id, newValue);
      loadData();
    }
  };

  // --- Document Handlers ---
  const handleSaveDocument = async (doc: DocumentItem) => {
    if (documentsList.find(d => d.id === doc.id)) {
      await cmsService.updateDocument(doc);
    } else {
      await cmsService.addDocument({ ...doc, id: Date.now().toString() });
    }
    setEditingItem(null);
    loadData();
  };
  
  const handleDeleteDocument = async (id: string) => {
    if(window.confirm('Delete document?')) {
      await cmsService.deleteDocument(id);
      loadData();
    }
  };

  // --- License Handlers ---
   const handleSaveLicense = async (lic: LicenseItem) => {
    if (data.licenses.find(l => l.id === lic.id)) {
      await cmsService.updateLicense(lic);
    } else {
      await cmsService.addLicense({ ...lic, id: Date.now().toString() });
    }
    setEditingItem(null);
    loadData();
  };

  const handleDeleteLicense = async (id: string) => {
    if(window.confirm('Delete license?')) {
        await cmsService.deleteLicense(id);
        loadData();
    }
  }

  // --- Vacancy Handlers ---
  const handleSaveVacancy = async (vac: Vacancy) => {
      if (data.vacancies.find(v => v.id === vac.id)) {
          await cmsService.updateVacancy(vac);
      } else {
          await cmsService.addVacancy({ ...vac, id: Date.now().toString() });
      }
      setEditingItem(null);
      loadData();
  }
   const handleDeleteVacancy = async (id: string) => {
    if(window.confirm('Delete vacancy?')) {
        await cmsService.deleteVacancy(id);
        loadData();
    }
  }


  // --- Render Helpers ---

  const documentsList = data.documents;

  const renderContentEditor = () => (
    <div className="space-y-8">
      {['home', 'about', 'prices'].map(section => (
        <div key={section} className="bg-white p-6 rounded-lg shadow border border-slate-200">
          <h3 className="text-xl font-bold capitalize mb-4 text-slate-700 border-b pb-2">{section} Page Content</h3>
          <div className="space-y-6">
            {data.content.filter(c => c.section === section).map(block => (
              <div key={block.id} className="grid grid-cols-1 gap-2">
                <label className="text-xs font-mono text-slate-500 uppercase">{block.key}</label>
                <div className="grid grid-cols-3 gap-4">
                  {Object.values(Language).map(lang => (
                    <div key={lang}>
                      <span className="text-xs font-bold text-slate-400 mb-1 block uppercase">{lang}</span>
                      {block.type === 'richtext' ? (
                        <textarea
                          className="w-full p-2 border rounded text-sm h-32"
                          value={block.value[lang]}
                          onChange={(e) => handleContentUpdate(block.id, block.key, e.target.value, lang)}
                        />
                      ) : (
                        <input
                          type="text"
                          className="w-full p-2 border rounded text-sm"
                          value={block.value[lang]}
                          onChange={(e) => handleContentUpdate(block.id, block.key, e.target.value, lang)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDocumentsEditor = () => (
    <div className="bg-white p-6 rounded-lg shadow">
       <div className="flex justify-between mb-6">
        <h3 className="text-xl font-bold">Documents & Blog</h3>
        <button 
          onClick={() => setEditingItem({ id: '', title: {kz:'',ru:'',en:''}, description: {kz:'',ru:'',en:''}, fileUrl: '', publishDate: new Date().toISOString().split('T')[0], isPublished: true })}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={16} /> Add Document
        </button>
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
             <h4 className="text-lg font-bold mb-4">Edit Document</h4>
             <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <input placeholder="Title KZ" className="border p-2 rounded" value={editingItem.title.kz} onChange={e => setEditingItem({...editingItem, title: {...editingItem.title, kz: e.target.value}})} />
                  <input placeholder="Title RU" className="border p-2 rounded" value={editingItem.title.ru} onChange={e => setEditingItem({...editingItem, title: {...editingItem.title, ru: e.target.value}})} />
                  <input placeholder="Title EN" className="border p-2 rounded" value={editingItem.title.en} onChange={e => setEditingItem({...editingItem, title: {...editingItem.title, en: e.target.value}})} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <textarea placeholder="Desc KZ" className="border p-2 rounded" value={editingItem.description.kz} onChange={e => setEditingItem({...editingItem, description: {...editingItem.description, kz: e.target.value}})} />
                  <textarea placeholder="Desc RU" className="border p-2 rounded" value={editingItem.description.ru} onChange={e => setEditingItem({...editingItem, description: {...editingItem.description, ru: e.target.value}})} />
                  <textarea placeholder="Desc EN" className="border p-2 rounded" value={editingItem.description.en} onChange={e => setEditingItem({...editingItem, description: {...editingItem.description, en: e.target.value}})} />
                </div>
                <input placeholder="File URL (Image/PDF)" className="border p-2 rounded w-full" value={editingItem.fileUrl} onChange={e => setEditingItem({...editingItem, fileUrl: e.target.value})} />
                <div className="flex gap-4">
                  <input type="date" className="border p-2 rounded" value={editingItem.publishDate} onChange={e => setEditingItem({...editingItem, publishDate: e.target.value})} />
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={editingItem.isPublished} onChange={e => setEditingItem({...editingItem, isPublished: e.target.checked})} /> Published
                  </label>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setEditingItem(null)} className="px-4 py-2 border rounded">Cancel</button>
                  <button onClick={() => handleSaveDocument(editingItem)} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                </div>
             </div>
          </div>
        </div>
      )}

      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-3">Title (EN)</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {documentsList.map(doc => (
            <tr key={doc.id} className="hover:bg-slate-50">
              <td className="p-3">{doc.title.en}</td>
              <td className="p-3">{doc.publishDate}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs ${doc.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {doc.isPublished ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="p-3 text-right flex justify-end gap-2">
                <button onClick={() => setEditingItem(doc)} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit2 size={18} /></button>
                <button onClick={() => handleDeleteDocument(doc.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderLicensesEditor = () => (
     <div className="bg-white p-6 rounded-lg shadow">
       <div className="flex justify-between mb-6">
        <h3 className="text-xl font-bold">Licenses & Certificates</h3>
        <button 
          onClick={() => setEditingItem({ id: '', title: {kz:'',ru:'',en:''}, category: LicenseCategory.LICENSE, imageUrl: '', isVisible: true })}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={16} /> Add License
        </button>
      </div>

       {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl">
             <h4 className="text-lg font-bold mb-4">Edit License</h4>
             <div className="space-y-4">
                 <div className="grid grid-cols-3 gap-2">
                  <input placeholder="Title KZ" className="border p-2 rounded" value={editingItem.title.kz} onChange={e => setEditingItem({...editingItem, title: {...editingItem.title, kz: e.target.value}})} />
                  <input placeholder="Title RU" className="border p-2 rounded" value={editingItem.title.ru} onChange={e => setEditingItem({...editingItem, title: {...editingItem.title, ru: e.target.value}})} />
                  <input placeholder="Title EN" className="border p-2 rounded" value={editingItem.title.en} onChange={e => setEditingItem({...editingItem, title: {...editingItem.title, en: e.target.value}})} />
                </div>
                <select className="border p-2 rounded w-full" value={editingItem.category} onChange={e => setEditingItem({...editingItem, category: e.target.value})}>
                  {Object.values(LicenseCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input placeholder="Image URL" className="border p-2 rounded w-full" value={editingItem.imageUrl} onChange={e => setEditingItem({...editingItem, imageUrl: e.target.value})} />
                
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setEditingItem(null)} className="px-4 py-2 border rounded">Cancel</button>
                  <button onClick={() => handleSaveLicense(editingItem)} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                </div>
             </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
         {data.licenses.map(lic => (
           <div key={lic.id} className="border p-4 rounded bg-slate-50 relative">
             <img src={lic.imageUrl} className="h-24 w-full object-contain mb-2 bg-white" alt="lic" />
             <p className="font-bold text-sm truncate">{lic.title.en}</p>
             <p className="text-xs text-slate-500">{lic.category}</p>
             <div className="flex gap-2 mt-2">
                <button onClick={() => setEditingItem(lic)} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDeleteLicense(lic.id)} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Delete</button>
             </div>
           </div>
         ))}
      </div>
    </div>
  );

  const renderVacanciesEditor = () => (
      <div className="bg-white p-6 rounded-lg shadow">
         <div className="flex justify-between mb-6">
        <h3 className="text-xl font-bold">Vacancies</h3>
        <button 
          onClick={() => setEditingItem({ id: '', title: {kz:'',ru:'',en:''}, description: {kz:'',ru:'',en:''}, salary: '', isVisible: true })}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={16} /> Add Vacancy
        </button>
      </div>
      
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
              <h4 className="text-lg font-bold mb-4">Edit Vacancy</h4>
               <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <input placeholder="Title KZ" className="border p-2 rounded" value={editingItem.title.kz} onChange={e => setEditingItem({...editingItem, title: {...editingItem.title, kz: e.target.value}})} />
                    <input placeholder="Title RU" className="border p-2 rounded" value={editingItem.title.ru} onChange={e => setEditingItem({...editingItem, title: {...editingItem.title, ru: e.target.value}})} />
                    <input placeholder="Title EN" className="border p-2 rounded" value={editingItem.title.en} onChange={e => setEditingItem({...editingItem, title: {...editingItem.title, en: e.target.value}})} />
                  </div>
                   <div className="grid grid-cols-3 gap-2">
                    <textarea placeholder="Desc KZ" className="border p-2 rounded" value={editingItem.description.kz} onChange={e => setEditingItem({...editingItem, description: {...editingItem.description, kz: e.target.value}})} />
                    <textarea placeholder="Desc RU" className="border p-2 rounded" value={editingItem.description.ru} onChange={e => setEditingItem({...editingItem, description: {...editingItem.description, ru: e.target.value}})} />
                    <textarea placeholder="Desc EN" className="border p-2 rounded" value={editingItem.description.en} onChange={e => setEditingItem({...editingItem, description: {...editingItem.description, en: e.target.value}})} />
                  </div>
                   <input placeholder="Salary (e.g. 2000 USD)" className="border p-2 rounded w-full" value={editingItem.salary} onChange={e => setEditingItem({...editingItem, salary: e.target.value})} />

                  <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setEditingItem(null)} className="px-4 py-2 border rounded">Cancel</button>
                    <button onClick={() => handleSaveVacancy(editingItem)} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                  </div>
               </div>
          </div>
        </div>
      )}

        <div className="space-y-4">
            {data.vacancies.map(vac => (
                <div key={vac.id} className="border p-4 rounded flex justify-between items-center">
                    <div>
                        <h4 className="font-bold">{vac.title.en}</h4>
                        <p className="text-sm text-slate-500">{vac.salary}</p>
                    </div>
                     <div className="flex gap-2">
                        <button onClick={() => setEditingItem(vac)} className="text-blue-600 hover:underline">Edit</button>
                        <button onClick={() => handleDeleteVacancy(vac.id)} className="text-red-600 hover:underline">Delete</button>
                     </div>
                </div>
            ))}
        </div>
      </div>
  )

  const renderContactsEditor = () => (
    <div className="bg-white p-6 rounded-lg shadow">
       <h3 className="text-xl font-bold mb-6">Contacts & Map Settings</h3>
       <div className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-3 gap-4">
             <div className="col-span-3">
               <label className="block text-sm font-bold mb-1">Address (KZ)</label>
               <input className="border p-2 rounded w-full" value={data.contacts.address.kz} onChange={e => cmsService.updateContact({...data.contacts, address: {...data.contacts.address, kz: e.target.value}}).then(loadData)} />
             </div>
             <div className="col-span-3">
               <label className="block text-sm font-bold mb-1">Address (RU)</label>
               <input className="border p-2 rounded w-full" value={data.contacts.address.ru} onChange={e => cmsService.updateContact({...data.contacts, address: {...data.contacts.address, ru: e.target.value}}).then(loadData)} />
             </div>
             <div className="col-span-3">
               <label className="block text-sm font-bold mb-1">Address (EN)</label>
               <input className="border p-2 rounded w-full" value={data.contacts.address.en} onChange={e => cmsService.updateContact({...data.contacts, address: {...data.contacts.address, en: e.target.value}}).then(loadData)} />
             </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Phone</label>
            <input className="border p-2 rounded w-full" value={data.contacts.phone} onChange={e => cmsService.updateContact({...data.contacts, phone: e.target.value}).then(loadData)} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input className="border p-2 rounded w-full" value={data.contacts.email} onChange={e => cmsService.updateContact({...data.contacts, email: e.target.value}).then(loadData)} />
          </div>
          <div className="grid grid-cols-2 gap-4 bg-slate-100 p-4 rounded">
            <h4 className="col-span-2 font-bold text-slate-700">Map Coordinates</h4>
             <div>
                <label className="block text-xs font-bold mb-1">Latitude</label>
                <input type="number" step="0.000001" className="border p-2 rounded w-full" value={data.contacts.coordinates.lat} onChange={e => cmsService.updateContact({...data.contacts, coordinates: {...data.contacts.coordinates, lat: parseFloat(e.target.value)}}).then(loadData)} />
             </div>
             <div>
                <label className="block text-xs font-bold mb-1">Longitude</label>
                <input type="number" step="0.000001" className="border p-2 rounded w-full" value={data.contacts.coordinates.lng} onChange={e => cmsService.updateContact({...data.contacts, coordinates: {...data.contacts.coordinates, lng: parseFloat(e.target.value)}}).then(loadData)} />
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold">Admin CMS</h2>
          <p className="text-xs text-slate-400">MarineParts Corp</p>
        </div>
        <nav className="p-4 space-y-2">
          <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'content' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Type size={18} /> Site Content
          </button>
          <button onClick={() => setActiveTab('documents')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'documents' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <FileText size={18} /> Documents
          </button>
          <button onClick={() => setActiveTab('licenses')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'licenses' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Award size={18} /> Licenses
          </button>
           <button onClick={() => setActiveTab('vacancies')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'vacancies' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Briefcase size={18} /> Vacancies
          </button>
          <button onClick={() => setActiveTab('contacts')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'contacts' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <MapPin size={18} /> Contacts & Map
          </button>
        </nav>
        <div className="p-4 mt-auto border-t border-slate-800">
          <button onClick={logout} className="flex items-center gap-2 text-slate-400 hover:text-white transition w-full">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              {activeTab === 'content' && 'Global Content Management'}
              {activeTab === 'documents' && 'Documents Blog'}
              {activeTab === 'licenses' && 'Licenses & Certs'}
              {activeTab === 'contacts' && 'Contacts Configuration'}
              {activeTab === 'vacancies' && 'Vacancies'}
            </h2>
            <div className="text-sm text-slate-500">
              Changes save to Local Database instantly
            </div>
          </header>

          {activeTab === 'content' && renderContentEditor()}
          {activeTab === 'documents' && renderDocumentsEditor()}
          {activeTab === 'licenses' && renderLicensesEditor()}
          {activeTab === 'vacancies' && renderVacanciesEditor()}
          {activeTab === 'contacts' && renderContactsEditor()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;