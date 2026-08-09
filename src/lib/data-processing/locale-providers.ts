export interface LocaleProvider {
  code: string;
  name: string;
  flag: string;
  sampleName: string;
  sampleCity: string;
  phoneFormat: string;
}

export const localeProviders: LocaleProvider[] = [
  { code: 'en-US', name: 'English (United States)', flag: '🇺🇸', sampleName: 'Alexander Wright', sampleCity: 'San Francisco', phoneFormat: '+1 (555) 019-2834' },
  { code: 'hi-IN', name: 'Hindi (India)', flag: '🇮🇳', sampleName: 'Aarav Sharma', sampleCity: 'Bengaluru', phoneFormat: '+91 98765 43210' },
  { code: 'ja-JP', name: 'Japanese (Japan)', flag: '🇯🇵', sampleName: 'Kenji Takahashi (高橋 健二)', sampleCity: 'Tokyo', phoneFormat: '+81 90-1234-5678' },
  { code: 'es-ES', name: 'Spanish (Spain)', flag: '🇪🇸', sampleName: 'Carlos García', sampleCity: 'Madrid', phoneFormat: '+34 612 34 56 78' },
  { code: 'de-DE', name: 'German (Germany)', flag: '🇩🇪', sampleName: 'Maximilian Müller', sampleCity: 'Berlin', phoneFormat: '+49 151 23456789' },
  { code: 'fr-FR', name: 'French (France)', flag: '🇫🇷', sampleName: 'Camille Dubois', sampleCity: 'Paris', phoneFormat: '+33 6 12 34 56 78' },
];
