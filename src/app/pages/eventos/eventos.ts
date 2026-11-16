import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EVENTS } from '../../data/events';
import { StorageService } from '../../core/services/storage';

@Component({
  selector: 'app-eventos',
  imports: [RouterLink],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css',
})
export class Eventos {
  private readonly storage = inject(StorageService);
  readonly events = EVENTS;
  readonly selectedIds = signal<string[]>(this.storage.read('events'));

  isSubscribed(id: string): boolean {
    return this.selectedIds().includes(id);
  }

  toggleSubscription(id: string): void {
    const current = this.selectedIds();
    const updated = current.includes(id)
      ? current.filter(savedId => savedId !== id)
      : [...current, id];
    this.selectedIds.set(updated);
    this.storage.write('events', updated);
  }
}
