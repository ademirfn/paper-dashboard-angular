import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { OnesihistoComponent } from './pages/onesihisto/onesihisto.component';
import { OnesimesComponent } from './pages/onesimes/onesimes.component';
import { TotaldownComponent } from './pages/totaldown/totaldown.component';
import { VersoesappComponent } from './pages/versoesapp/versoesapp.component';
import { PushtotaisComponent } from './pages/pushtotais/pushtotais.component';
import { PushComponent } from './pages/push/push.component';
import { AtivosinativosComponent } from './pages/ativosinativos/ativosinativos.component';
import { AcessosliberadosComponent } from './pages/acessosliberados/acessosliberados.component';
import { UserunidadesComponent } from './pages/userunidades/userunidades.component';
import { AcessosessoesComponent } from './pages/acessosessoes/acessosessoes.component';
import { SessoeslikecomComponent } from './pages/sessoeslikecom/sessoeslikecom.component';
import { PostagensComponent } from './pages/postagens/postagens.component';
import { ColaboradoresComponent } from './pages/colaboradores/colaboradores.component';
import { HubconteudoComponent } from './pages/hubconteudo/hubconteudo.component';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    OnesihistoComponent,
    OnesimesComponent,
    TotaldownComponent,
    VersoesappComponent,
    PushtotaisComponent,
    PushComponent,
    AtivosinativosComponent,
    AcessosliberadosComponent,
    UserunidadesComponent,
    AcessosessoesComponent,
    SessoeslikecomComponent,
    PostagensComponent,
    ColaboradoresComponent,
    HubconteudoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    NgChartsModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
