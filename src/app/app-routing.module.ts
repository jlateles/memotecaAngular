import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './custom-reuse-estrategy'
import { CriarPensamentoComponent } from './componentes/pensamentos/criar-pensamento/criar-pensamento.component';
import { ListarPensamentoComponent } from './componentes/pensamentos/listar-pensamento/listar-pensamento.component';
import { ExcluirPensamentoComponent } from './componentes/pensamentos/excluir-pensamento/excluir-pensamento.component';
import { EditarPensamentoComponent } from './componentes/pensamentos/editar-pensamento/editar-pensamento.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'listarPensamento',
    pathMatch: 'full'
  },

   {
    path: 'criarPensamento',
    component: CriarPensamentoComponent
   },

   {
    path: 'listarPensamento',
    component: ListarPensamentoComponent,
      data: {
        reuseComponent: true
      }
   },

   {
    path: 'pensamentos/excluirPensamento/:id',
    component: ExcluirPensamentoComponent
   },

   {
    path: 'pensamentos/editarPensamento/:id',
    component: EditarPensamentoComponent
   }



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'} )],
  exports: [RouterModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
})
export class AppRoutingModule { }
