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
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { MyListsResolverService } from './resolvers/my-lists-resolver.service';
import { ListResolverService } from './resolvers/list-resolver.service';
import { AuthGuard } from './guards/auth.guard';
import { ListComponent } from './pages/list/list.component';
import { ActivateUserComponent } from './pages/activate-user/activate-user.component';
import { ActivateUserResolver } from './resolvers/activate-user-resolver.service';

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
        path: 'activate/:userID/:token',
        component: ActivateUserComponent,
        resolve: {
          success: ActivateUserResolver,
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
        path: 'mylists',
        component: MyListsComponent,
        resolve: { listCollection: MyListsResolverService },
        canActivate: [AuthGuard],
      },
      {
        path: 'list/:listid',
        component: ListComponent,
        resolve: {
          resolver: ListResolverService,
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
        redirectTo: '/latest',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/latest',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
