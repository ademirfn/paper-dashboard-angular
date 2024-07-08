import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

import { OnesihistoComponent } from '../../pages/onesihisto/onesihisto.component';
import { OnesimesComponent } from '../../pages/onesimes/onesimes.component';
import { TotaldownComponent } from '../../pages/totaldown/totaldown.component';
import { VersoesappComponent } from '../../pages/versoesapp/versoesapp.component';
import { PushtotaisComponent } from '../../pages/pushtotais/pushtotais.component';
import { PushComponent } from '../../pages/push/push.component';
import { AtivosinativosComponent } from '../../pages/ativosinativos/ativosinativos.component';
import { AcessosliberadosComponent } from '../../pages/acessosliberados/acessosliberados.component';
import { UserunidadesComponent } from '../../pages/userunidades/userunidades.component';
import { AcessosessoesComponent } from '../../pages/acessosessoes/acessosessoes.component';
import { SessoeslikecomComponent } from '../../pages/sessoeslikecom/sessoeslikecom.component';
import { PostagensComponent } from '../../pages/postagens/postagens.component';
import { ColaboradoresComponent } from '../../pages/colaboradores/colaboradores.component';
import { HubconteudoComponent } from '../../pages/hubconteudo/hubconteudo.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent } ,
    //novas rotas
    { path: 'onesignalhistory',        component: OnesihistoComponent } ,
    { path: 'onesignalmes',        component: OnesimesComponent } ,
    { path: 'totaldownloads',        component: TotaldownComponent } ,
    { path: 'versoesapp',        component: VersoesappComponent } ,
    { path: 'pushstotais',        component: PushtotaisComponent } ,
    { path: 'pushs',        component: PushComponent } ,
    { path: 'ativosinativos',        component: AtivosinativosComponent } ,
    { path: 'acessosliberados',        component: AcessosliberadosComponent } ,
    { path: 'userunidades',        component: UserunidadesComponent } ,
    { path: 'acessosessoes',        component: AcessosessoesComponent } ,
    { path: 'sessoeslikescom',        component: SessoeslikecomComponent } ,
    { path: 'postagens',        component: PostagensComponent } ,
    { path: 'colaboradores',        component: ColaboradoresComponent } ,
    { path: 'hubconteudo',        component: HubconteudoComponent } ,
];
