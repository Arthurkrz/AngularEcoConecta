import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/home/home').then(m => m.Home)
    },

    {
        path: 'sobre',
        loadComponent: () =>
            import('./pages/sobre/sobre').then(m => m.Sobre)
    },
    
    {
        path: 'dicas',
        loadComponent: () =>
            import('./pages/dicas/dicas').then(m => m.Dicas)
    },

    {
        path: 'projetos',
        loadComponent: () =>
            import('./pages/projetos/projetos').then(m => m.Projetos)
    },

    {
        path: 'galeria',
        loadComponent: () =>
            import('./pages/galeria/galeria').then(m => m.Galeria)        
    },

    {
        path: 'eventos',
        loadComponent: () =>
            import('./pages/eventos/eventos').then(m => m.Eventos)
    },

    {
        path: 'recursos',
        loadComponent: () =>
            import('./pages/recursos/recursos').then(m => m.Recursos)
    },

    {
        path: 'midia',
        loadComponent: () =>
            import('./pages/midia/midia').then(m => m.Midia)
    },

    {
        path: 'contato',
        loadComponent: () =>
            import('./pages/contato/contato').then(m => m.Contato)
    },

    {
        path: 'cadastro',
        loadComponent: () =>
            import('./pages/cadastro/cadastro').then(m => m.Cadastro)
    },

    {
        path: 'painel',
        loadComponent: () =>
            import('./pages/painel/painel').then(m => m.Painel)
    },

    {
        path: '**',
        redirectTo: ''
    }
];
