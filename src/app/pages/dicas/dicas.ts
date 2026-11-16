import { Component, computed, signal } from '@angular/core';
import { EcoCard } from '../../shared/components/eco-card/eco-card';
import { TIPS } from '../../data/tips';

@Component({
  selector: 'app-dicas',
  imports: [EcoCard],
  templateUrl: './dicas.html',
  styleUrl: './dicas.css',
})
export class Dicas {
  readonly categories = ["Todas", "Casa", "Cidade", "Consumo"];
  readonly selectedCategory = signal('Todos');
  readonly filteredItems = computed(() =>
    this.selectedCategory() === 'Todos'
      ? TIPS
      : TIPS.filter(item => item.category === this.selectedCategory())
  );

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
