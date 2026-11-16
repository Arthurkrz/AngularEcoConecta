import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);

  read<T = string>(key: string): T[] {
    if (!isPlatformBrowser(this.platformId)) return [];
    try {
      const value: unknown = JSON.parse(localStorage.getItem('ecoconecta_' + key) ?? '[]');
      return Array.isArray(value) ? value as T[] : [];
    } catch {
      return [];
    }
  }

  write<T = string>(key: string, values: T[]): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem('ecoconecta_' + key, JSON.stringify(values));
  }
}
