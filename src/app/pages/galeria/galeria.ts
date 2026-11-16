import { Component, computed, signal } from '@angular/core';
import { TIPS } from '../../data/tips';
import { PROJECTS } from '../../data/projects';

@Component({
  selector: 'app-galeria',
  imports: [],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria {
  readonly categories = [
    { name: 'Todas', value: 'Todos' },
    { name: 'Casa', value: 'Casa' },
    { name: 'Cidade', value: 'Cidade' },
    { name: 'Consumo', value: 'Consumo' },
    { name: 'Educação', value: 'Educação' },
    { name: 'Comunidade', value: 'Comunidade' },
  ];

  readonly entries = [...TIPS, ...PROJECTS.slice(0, 3)];
  readonly selectedCategory = signal('Todos');
  readonly filteredEntries = computed(() =>
    this.selectedCategory() === 'Todos'
      ? this.entries
      : this.entries.filter(item => item.category === this.selectedCategory())
  );

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
