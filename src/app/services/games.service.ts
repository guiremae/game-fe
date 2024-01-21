import { Inject, Injectable, Renderer2 } from '@angular/core';
import { Game } from 'src/app/models/interfaces/game.interface';
import { IgdbService } from './igdb.service';
import { PlatformEvent } from 'src/app/models/interfaces/platformEvent.interface';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  public latestGames: Game[] = [];
  public platforms!: any[];
  private dateNow: number = Math.round(Date.now()/1000);
  public platformName: string = "";
  public isThereAnyError: boolean = true;
  public isSearching: boolean = false;
  public pageNumber: number = 1;
  private targetUrl: string ="";
  public searchName: string = "";
  public hasResults: boolean = true;
  public hasResponse: boolean = false;
  private _pageTitle = new BehaviorSubject<string>('Nuevos lanzamientos');
  private lastAction: string = 'latest';

  pageTitle$ = this._pageTitle.asObservable();


  constructor(private igdb:IgdbService, private location:Location) { }

  SearchGame(searching: string): void{
    this.searchName = searching
    this.isSearching = true
    this.igdb.findSearchedGames(searching, this.pageNumber).subscribe({
      next: (resp: Game[]) =>{
        this.latestGames = resp;
        if(this.latestGames.length == 0)
        this.hasResults = false
        else
        this.hasResults = true
        this.hasResponse = true
      },
      error: (err) => {
        console.log(err)
        this.isThereAnyError = true
      }
    })
    this._pageTitle.next(`Resultados para: ${searching}`)
    this.location.go(`/search/${searching}`);
  }


  FindPlatformGames(platform: PlatformEvent): void{
    this.igdb.findLastGamesForPlatform(this.dateNow, platform.number, this.pageNumber).subscribe({
      next: (resp: Game[]) =>{
        this.latestGames = resp;
        console.log(this.latestGames)
        this.isThereAnyError = false
        if(this.latestGames.length == 0)
        this.hasResults = false
        else
        this.hasResults = true
        this.hasResponse = true
      },
      error: (err) => {
        console.log(err)
        this.isThereAnyError = true
      }
    })
    this._pageTitle.next(`Nuevos lanzamientos para ${platform.name}`)
  }

  getPlatformGames(param : string) : void{
    if(!isNaN(Number(param)))
      this.igdb.getPlatformName(Number(param)).subscribe({
        next: (resp: any) =>{
          console.log(resp[0])
          this.platformName = resp[0].name;
          this.FindPlatformGames({number: parseInt(param), name: this.platformName})
        },
        error: (err) => {
          this.platformName = "error";
        }
      })
    else
    this.igdb.getPlatformID(param).subscribe({
      next: (resp: any) =>{
        console.log(resp)
        this.platformName = decodeURIComponent(param)
        if(resp.length >= 1)
        this.FindPlatformGames({number: resp[0].id, name: this.platformName})
        else
        this.SearchGame(param);
      },
      error: (err) => {
        this.platformName = "error";
      }
    })
  }

  FindLatestGames(): void{
    this.location.go(`/latest`);
    this.igdb.findLastGames(this.dateNow, 1).subscribe({
      next: (resp: Game[]) =>{
        this.latestGames = resp;
        this.isThereAnyError = false
        if(this.latestGames.length == 0)
        this.hasResults = false
        else
        this.hasResults = true
        this.hasResponse = true
      },
      error: (err) => {
        console.log(err)
        this.isThereAnyError = true
      }
    })
  }

  ChangeNumberPage(pageNumber: number): void{
    let route = this.location.path();
    const hasPageNumber = /\d+$/.test(route);
    if (hasPageNumber) {
      route = route.replace(/\d+$/, pageNumber.toString());
    } else {
      route += (route.endsWith('/') ? '' : '/') + pageNumber;
    }
    this.igdb.changePageNumber(this.dateNow, pageNumber).subscribe({
      next: (resp: Game[]) =>{
        this.location.go(route);
        this.latestGames = resp
        this.isThereAnyError = false
        if(this.latestGames.length == 0)
        this.hasResults = false
        else
        this.hasResults = true
        this.hasResponse = true
      },
      error: (err) => {
        console.log(err)
        this.isThereAnyError = true
      }
    })
  }
}
