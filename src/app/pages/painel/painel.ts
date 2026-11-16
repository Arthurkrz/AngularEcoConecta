import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../core/services/storage';
import { EcoMember } from '../../models/eco-member';
import { ContactMessage } from '../../models/contact-message';
import { TIPS } from '../../data/tips';
import { PROJECTS } from '../../data/projects';
import { EVENTS } from '../../data/events';

@Component({
  selector: 'app-painel',
  imports: [RouterLink],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel {
  private readonly storage = inject(StorageService);
  readonly members = signal<EcoMember[]>([]);
  readonly messages = signal<ContactMessage[]>([]);
  readonly favoriteTips = signal<string[]>([]);
  readonly savedProjects = signal<string[]>([]);
  readonly registeredEvents = signal<string[]>([]);
  readonly feedback = signal('');
  readonly tips = TIPS;
  readonly projects = PROJECTS;
  readonly events = EVENTS;

  constructor() {
    afterNextRender(() => this.atualizar());
  }

  atualizar(): void {
    this.members.set(this.storage.read<EcoMember>('members'));
    this.messages.set(this.storage.read<ContactMessage>('messages'));
    this.favoriteTips.set(this.storage.read('favorites'));
    this.savedProjects.set(this.storage.read('savedProjects'));
    this.registeredEvents.set(this.storage.read('events'));
  }

  apagarDados(): void {
    if (!confirm('Apagar TODOS os dados do EcoConecta salvos neste navegador?')) return;
    for (const key of ['members', 'messages', 'favorites', 'savedProjects', 'events']) {
      this.storage.write(key, []);
    }
    this.atualizar();
    this.feedback.set('Dados locais apagados.');
  }
}
