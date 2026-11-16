import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EcoItem, EcoItemType } from '../../../models/eco-item';
import { StorageService } from '../../../core/services/storage';

@Component({
  selector: 'app-eco-card',
  imports: [RouterLink],
  templateUrl: './eco-card.html',
  styleUrl: './eco-card.css',
})
export class EcoCard {
  readonly item = input.required<EcoItem>();
  readonly type = input.required<EcoItemType>();
  private readonly storage = inject(StorageService);
  private readonly savedTips = signal(this.storage.read('favorites'));
  private readonly savedProjects = signal(this.storage.read('savedProjects'));

  readonly saved = computed(() => {
    const ids = this.type() === 'tip' ? this.savedTips() : this.savedProjects();
    return ids.includes(this.item().id);
  });

  toggleSave(): void {
    const key = this.type() === 'tip' ? 'favorites' : 'savedProjects';
    const state = this.type() === 'tip' ? this.savedTips : this.savedProjects;
    const id = this.item().id;
    const ids = state();
    const updated = ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id];
    state.set(updated);
    this.storage.write(key, updated);
  }
}
