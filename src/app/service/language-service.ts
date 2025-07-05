import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

   private languageSignal = signal<string>('en');

  get currentLanguage() {
    return this.languageSignal.asReadonly();
  }

  setLanguage(lang: string) {
    this.languageSignal.set(lang);
    document.documentElement.lang = lang;

  
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }
}
