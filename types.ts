export enum Language {
  KZ = 'kz',
  RU = 'ru',
  EN = 'en',
}

export interface LocalizedString {
  kz: string;
  ru: string;
  en: string;
}

export interface ContentBlock {
  id: string;
  section: string; // e.g., 'home', 'about'
  key: string; // e.g., 'hero_title'
  value: LocalizedString;
  type: 'text' | 'richtext' | 'image';
}

export interface DocumentItem {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  fileUrl: string;
  publishDate: string;
  isPublished: boolean;
}

export enum LicenseCategory {
  LICENSE = 'License',
  CERTIFICATE = 'Certificate',
  PERMIT = 'Permit',
}

export interface LicenseItem {
  id: string;
  title: LocalizedString;
  category: LicenseCategory;
  imageUrl: string;
  isVisible: boolean;
}

export interface ContactInfo {
  address: LocalizedString;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Vacancy {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  salary: string;
  isVisible: boolean;
}

export interface AppData {
  content: ContentBlock[];
  documents: DocumentItem[];
  licenses: LicenseItem[];
  contacts: ContactInfo;
  vacancies: Vacancy[];
}