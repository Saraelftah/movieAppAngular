import { Component, inject, OnInit, computed } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { SelectModule, Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import {LanguageService } from '../../service/language-service';
import { WatchlistService } from '../../service/watchlist-service';

interface Language {
  name: string;
  code: string;
}

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, InputTextModule, Ripple, CommonModule, SelectModule, FormsModule, Select, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {

  items: MenuItem[] | undefined;
  languages: Language[] = [];
  selectedLanguage!: Language;
  languageService = inject (LanguageService);
  watchlistService = inject(WatchlistService);
  watchlistCount = computed(() => this.watchlistService.wishlist().length);

  ngOnInit() {
    this.languages = [
      { name: 'English', code: 'en' },
      { name: 'العربية', code: 'ar' },
      { name: 'Français', code: 'fr' },
      { name: '中文', code: 'zh' }
    ];
    this.selectedLanguage = this.languages[0];
    this.languageService.setLanguage(this.selectedLanguage.code);

    this.items = [
      {label: 'Movies',routerLink: '/'},
      {label: 'Tv Shows',routerLink: '/tvShows'},
    ]
  }

   onLanguageChange(): void {
      this.languageService.setLanguage(this.selectedLanguage.code);
    }
}
