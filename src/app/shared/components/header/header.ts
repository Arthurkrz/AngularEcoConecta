import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly menuAberto = signal(false);
  readonly paginas = [
    { rota: '/', nome: 'Início', exata: true },
    { rota: '/sobre', nome: 'Sobre', exata: true },
    { rota: '/dicas', nome: 'Dicas', exata: true },
    { rota: '/projetos', nome: 'Projetos', exata: true },
    { rota: '/galeria', nome: 'Galeria', exata: true },
    { rota: '/eventos', nome: 'Eventos', exata: true },
    { rota: '/recursos', nome: 'Recursos', exata: true },
    { rota: '/midia', nome: 'Mídia', exata: true },
    { rota: '/contato', nome: 'Contato', exata: true },
    { rota: '/cadastro', nome: 'Cadastro', exata: true },
    { rota: '/painel', nome: 'Meu painel', exata: true }
  ];

  alternarMenu(): void { this.menuAberto.update(aberto => !aberto); }
  fecharMenu(): void { this.menuAberto.set(false); }
}
