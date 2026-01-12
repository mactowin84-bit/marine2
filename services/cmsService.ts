import { AppData, ContentBlock, ContactInfo, DocumentItem, LicenseItem, LicenseCategory, Language, Vacancy } from '../types';

const DB_KEY = 'marine_corp_db_v1';

const INITIAL_DATA: AppData = {
  content: [
    // Home
    { id: '1', section: 'home', key: 'hero_title', type: 'text', value: { kz: 'Теңіз қозғалтқыштарының сапасы', ru: 'Качество морских двигателей', en: 'Quality Marine Engines' } },
    { id: '2', section: 'home', key: 'hero_subtitle', type: 'text', value: { kz: 'Кеме қосалқы бөлшектерінің сенімді жеткізушісі', ru: 'Ваш надежный поставщик судовых запчастей', en: 'Your reliable supplier of ship spare parts' } },
    { id: '3', section: 'home', key: 'about_teaser', type: 'richtext', value: { kz: 'Біз 20 жылдан астам нарықтамыз...', ru: 'Мы на рынке более 20 лет...', en: 'We have been in the market for over 20 years...' } },
    // About
    { id: '4', section: 'about', key: 'main_text', type: 'richtext', value: { kz: 'Біздің компания жетекші өндірушілермен тікелей жұмыс істейді.', ru: 'Наша компания работает напрямую с ведущими производителями.', en: 'Our company works directly with leading manufacturers.' } },
    // Prices
    { id: '5', section: 'prices', key: 'intro', type: 'text', value: { kz: 'Бәсекеге қабілетті бағалар', ru: 'Конкурентные цены', en: 'Competitive Prices' } },
  ],
  documents: [
    {
      id: 'doc1',
      title: { kz: 'Жылдық есеп 2023', ru: 'Годовой отчет 2023', en: 'Annual Report 2023' },
      description: { kz: 'Қаржылық нәтижелер', ru: 'Финансовые результаты', en: 'Financial results' },
      fileUrl: 'https://picsum.photos/seed/doc1/800/600', // Placeholder for file
      publishDate: '2023-12-31',
      isPublished: true,
    },
    {
      id: 'doc2',
      title: { kz: 'Техникалық сипаттама', ru: 'Техническая спецификация', en: 'Technical Specification' },
      description: { kz: 'Қозғалтқыш X-500', ru: 'Двигатель X-500', en: 'Engine X-500' },
      fileUrl: 'https://picsum.photos/seed/doc2/800/600',
      publishDate: '2024-01-15',
      isPublished: true,
    }
  ],
  licenses: [
    {
      id: 'lic1',
      title: { kz: 'ISO 9001 Сертификаты', ru: 'Сертификат ISO 9001', en: 'ISO 9001 Certificate' },
      category: LicenseCategory.CERTIFICATE,
      imageUrl: 'https://picsum.photos/seed/iso/400/600',
      isVisible: true
    },
    {
      id: 'lic2',
      title: { kz: 'Жұмыс лицензиясы', ru: 'Лицензия на деятельность', en: 'Operation License' },
      category: LicenseCategory.LICENSE,
      imageUrl: 'https://picsum.photos/seed/license/400/600',
      isVisible: true
    }
  ],
  vacancies: [
    {
        id: 'vac1',
        title: { kz: 'Сату жөніндегі менеджер', ru: 'Менеджер по продажам', en: 'Sales Manager' },
        description: { kz: 'Тәжірибесі 3 жыл', ru: 'Опыт работы 3 года', en: '3 years experience' },
        salary: '3000 USD',
        isVisible: true
    }
  ],
  contacts: {
    address: { kz: 'Алматы қ., Абай даңғылы 10', ru: 'г. Алматы, пр. Абая 10', en: 'Almaty, Abay Ave 10' },
    phone: '+7 777 123 45 67',
    email: 'info@marineparts.kz',
    coordinates: { lat: 43.238949, lng: 76.889709 }
  }
};

// Initialize DB
if (!localStorage.getItem(DB_KEY)) {
  localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DATA));
}

const getDb = (): AppData => {
  const str = localStorage.getItem(DB_KEY);
  return str ? JSON.parse(str) : INITIAL_DATA;
};

const saveDb = (data: AppData) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
  // Dispatch event for instant updates across components
  window.dispatchEvent(new Event('cms-update'));
};

export const cmsService = {
  getData: async (): Promise<AppData> => {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 300));
    return getDb();
  },

  updateContent: async (id: string, value: Partial<ContentBlock['value']>) => {
    const db = getDb();
    const idx = db.content.findIndex(c => c.id === id);
    if (idx !== -1) {
      db.content[idx].value = { ...db.content[idx].value, ...value };
      saveDb(db);
    }
  },

  updateContact: async (contacts: ContactInfo) => {
    const db = getDb();
    db.contacts = contacts;
    saveDb(db);
  },
  
  // Documents
  addDocument: async (doc: DocumentItem) => {
    const db = getDb();
    db.documents.push(doc);
    saveDb(db);
  },
  updateDocument: async (doc: DocumentItem) => {
    const db = getDb();
    const idx = db.documents.findIndex(d => d.id === doc.id);
    if (idx !== -1) {
      db.documents[idx] = doc;
      saveDb(db);
    }
  },
  deleteDocument: async (id: string) => {
    const db = getDb();
    db.documents = db.documents.filter(d => d.id !== id);
    saveDb(db);
  },

  // Licenses
  addLicense: async (lic: LicenseItem) => {
    const db = getDb();
    db.licenses.push(lic);
    saveDb(db);
  },
  updateLicense: async (lic: LicenseItem) => {
    const db = getDb();
    const idx = db.licenses.findIndex(l => l.id === lic.id);
    if (idx !== -1) {
        db.licenses[idx] = lic;
        saveDb(db);
    }
  },
  deleteLicense: async (id: string) => {
      const db = getDb();
      db.licenses = db.licenses.filter(l => l.id !== id);
      saveDb(db);
  },

  // Vacancies
  addVacancy: async (vac: Vacancy) => {
      const db = getDb();
      db.vacancies.push(vac);
      saveDb(db);
  },
  updateVacancy: async (vac: Vacancy) => {
      const db = getDb();
      const idx = db.vacancies.findIndex(v => v.id === vac.id);
      if(idx !== -1) {
          db.vacancies[idx] = vac;
          saveDb(db);
      }
  },
  deleteVacancy: async (id: string) => {
      const db = getDb();
      db.vacancies = db.vacancies.filter(v => v.id !== id);
      saveDb(db);
  }
};
