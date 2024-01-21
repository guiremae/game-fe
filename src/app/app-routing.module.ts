import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', // Agrega pathMatch: 'full' para que coincida solo con una cadena de ruta vacía
    redirectTo: 'latest', // Redirecciona a 'latest' cuando la ruta es una cadena vacía
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'latest',
        component: HomeComponent,
        data: { action: 'latest' },
      },
      {
        path: 'latest/:page',
        component: HomeComponent,
        data: { action: 'page' },
      },
      {
        path: 'search/:name/:page',
        component: HomeComponent,
        data: { action: 'search' },
      },
      {
        path: 'search/:name',
        component: HomeComponent,
        data: { action: 'search' },
      },
      {
        path: ':platform/:page',
        component: HomeComponent,
      },
      {
        path: ':platform',
        component: HomeComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'latest',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
