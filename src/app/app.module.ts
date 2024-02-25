import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddToListComponent } from './components/add-to-list/add-to-list.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FinderComponent } from './components/finder/finder.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameDetailsCardComponent } from './components/game-details-card/game-details-card.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { PageNavComponent } from './components/page-nav/page-nav.component';
import { PictureModalComponent } from './components/picture-modal/picture-modal.component';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { GameComponent } from './pages/game/game.component';
import { HomeComponent } from './pages/home/home.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { CdkDropList, CdkDragPreview, CdkDrag } from '@angular/cdk/drag-drop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutService } from 'src/app/services/layout.service';
import { ShareComponent } from './components/share/share.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    GameCardComponent,
    NavComponent,
    PageNavComponent,
    LoginComponent,
    FinderComponent,
    LayoutComponent,
    SignupComponent,
    AddToListComponent,
    GameComponent,
    CarouselComponent,
    GameDetailsCardComponent,
    PictureModalComponent,
    LoaderComponent,
    MyListsComponent,
    ShareComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    CdkDropList,
    CdkDrag,
    CdkDragPreview,
    MatSidenavModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    LayoutService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
