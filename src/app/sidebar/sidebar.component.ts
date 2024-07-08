import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string; 
    class: string;
}

export const ROUTES: RouteInfo[] = [
   // { path: '/dashboard',     title: 'Relatório',         icon:'nc-bank',       class: '' },
    { path: '/onesignalhistory',     title: 'Historico Onesignal',         icon:'nc-bank',       class: '' },
   // { path: '/onesignalmes',     title: 'Resumo Onesignal',         icon:'nc-bank',       class: '' },
    { path: '/pushstotais',     title: 'Totais Onesignal',         icon:'nc-bank',       class: '' },
    { path: '/pushs',     title: 'Detalhe Onesignal',         icon:'nc-bank',       class: '' },
    { path: '/totaldownloads',     title: 'Total Downloads',         icon:'nc-bank',       class: '' },
    { path: '/versoesapp',     title: 'Versões do App',         icon:'nc-bank',       class: '' },
    { path: '/ativosinativos',     title: 'Ativos e 1 acesso',         icon:'nc-bank',       class: '' },
    { path: '/acessosliberados',     title: 'Acessos liberados',         icon:'nc-bank',       class: '' },
    { path: '/userunidades',     title: 'Usuários Unidades',         icon:'nc-bank',       class: '' },
    { path: '/acessosessoes',     title: 'Sessões Acessos',         icon:'nc-bank',       class: '' },
    { path: '/sessoeslikescom',     title: 'Sessões Engajamento',         icon:'nc-bank',       class: '' },
    { path: '/postagens',     title: 'Postagens',         icon:'nc-bank',       class: '' },
    { path: '/colaboradores',     title: 'Colaboradores',         icon:'nc-bank',       class: '' },
    { path: '/hubconteudo',     title: 'Hub de Conteúdo',         icon:'nc-bank',       class: '' },
    
  /**   { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },*/
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
