import { Component, computed, signal } from '@angular/core';
import { EcoCard } from '../../shared/components/eco-card/eco-card';
import { PROJECTS } from '../../data/projects';

@Component({
  selector: 'app-projetos',
  imports: [EcoCard],
  templateUrl: './projetos.html',
  styleUrl: './projetos.css',
})
export class Projetos {
  readonly categories = ["Todos", "Educação", "Comunidade"];
  readonly selectedCategory = signal('Todos');
  readonly filteredItems = computed(() =>
    this.selectedCategory() === 'Todos'
      ? PROJECTS
      : PROJECTS.filter(item => item.category === this.selectedCategory())
  );

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
