import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GameComponent } from './pages/game/game.component';
import { IgdbAuthGuard } from './guards/igdb-auth.guard';
import { GameResolverService } from './resolvers/game-resolver.service';
import { SearchGameResolverService } from './resolvers/search-game-resolver.service';
import { LatestGamesResolverService } from './resolvers/latest-games-resolver.service';
import { PlatformGamesResolverService } from './resolvers/platform-games-resolver.service';

// Importar componentes y servicios necesarios...

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [IgdbAuthGuard],
    children: [
      {
        path: 'latest',
        component: HomeComponent,
        resolve: {
          resolver: LatestGamesResolverService,
        },
      },
      {
        path: 'latest/:page',
        component: HomeComponent,
        resolve: {
          resolver: LatestGamesResolverService,
        },
      },
      {
        path: 'search/:name',
        component: HomeComponent,
        resolve: {
          resolver: SearchGameResolverService,
        },
      },
      {
        path: 'search/:name/:page',
        component: HomeComponent,
        resolve: {
          resolver: SearchGameResolverService,
        },
      },
      {
        path: 'game/:id',
        component: GameComponent,
        resolve: {
          game: GameResolverService,
        },
      },
      {
        path: ':platform/:page',
        component: HomeComponent,
        resolve: {
          resolver: PlatformGamesResolverService,
        },
      },
      {
        path: ':platform',
        component: HomeComponent,
        resolve: {
          resolver: PlatformGamesResolverService,
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'latest',
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
