import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/interfaces/game.interface';

@Injectable({
  providedIn: 'root',
})
export class IgdbService {
  private baseURL = 'https://api.igdb.com/v4/games';
  private clientID: string = 'pev408euurhwg577z5h615cjapf84y';
  private clientSecret: string = 'vmfiabbeu2bgf8xr4pgoilzm7xtlsp';
  private cors_api_host: string = 'https://corsproxy.io/?';
  private authToken: string = '';
  private platform: number = 0;
  private searching: string = '';

  constructor(private httpClient: HttpClient) {}

  public authAPI(): Observable<any> {
    return this.httpClient.post<any>('https://id.twitch.tv/oauth2/token', {
      client_id: this.clientID,
      client_secret: this.clientSecret,
      grant_type: 'client_credentials',
    });
  }

  public hasAuthToken(): boolean {
    return this.authToken ? true : false;
  }

  public findLastGames(date: number, page: number): Observable<Game[]> {
    this.searching = '';
    this.platform = 0;
    return this.httpClient.post<Game[]>(
      `${this.cors_api_host}${this.baseURL}`,
      `fields platforms.name, platforms.abbreviation, cover.url, genres.name, *; sort first_release_date desc; where first_release_date != null & first_release_date < ${date} & rating != null & category != (1, 2, 3, 5) & genres != null & cover != null & name != null; limit 6; offset ${
        (page - 1) * 6
      };`,
      {
        headers: {
          'Client-ID': this.clientID,
          Authorization: 'Bearer ' + this.authToken,
        },
      }
    );
  }

  public findLastGamesForPlatform(
    date: number,
    platformId: number,
    page: number
  ): Observable<Game[]> {
    this.platform = platformId;
    this.searching = '';
    return this.httpClient.post<Game[]>(
      this.cors_api_host + this.baseURL,
      'fields platforms.name, platforms.abbreviation, cover.url, genres.name, *; sort first_release_date desc; where first_release_date != null & first_release_date < ' +
        date +
        ' & rating != null & platforms = (' +
        platformId +
        ') & genres != null & category != (1, 2, 3, 5) & cover != null; limit 6; offset ' +
        (page - 1) * 6 +
        ';',
      {
        headers: {
          'Client-ID': this.clientID,
          Authorization: 'Bearer ' + this.authToken,
        },
      }
    );
  }

  public findSearchedGames(search: string, page: number) {
    this.searching = search;
    this.platform = 0;
    return this.httpClient.post<Game[]>(
      this.cors_api_host + this.baseURL,
      'fields platforms.name, cover.url, genres.name, *; limit 6; offset ' +
        (page - 1) * 6 +
        '; search "' +
        search +
        '" ;',
      {
        headers: {
          'Client-ID': this.clientID,
          Authorization: 'Bearer ' + this.authToken,
        },
      }
    );
  }

  public changePageNumber(date: number, page: number): Observable<Game[]> {
    if (this.platform === 0 && this.searching === '')
      return this.findLastGames(date, page);
    else if (this.platform === 0)
      return this.findSearchedGames(this.searching, page);
    else return this.findLastGamesForPlatform(date, this.platform, page);
  }

  public getAuthToken(authToken: string) {
    this.authToken = authToken;
  }

  public getPlatformName(id: number): Observable<any> {
    const apiUrl = this.cors_api_host + 'https://api.igdb.com/v4/platforms';

    return this.httpClient.post<any>(
      apiUrl,
      'fields *; where id = ' + id + '; limit 1;',
      {
        headers: {
          'Client-ID': this.clientID,
          Authorization: 'Bearer ' + this.authToken,
        },
      }
    );
  }

  public getPlatformID(name: string): Observable<any> {
    const apiUrl = this.cors_api_host + 'https://api.igdb.com/v4/platforms';

    return this.httpClient.post<any>(
      apiUrl,
      'fields *; where abbreviation = "' + name + '"; limit 1;',
      {
        headers: {
          'Client-ID': this.clientID,
          Authorization: 'Bearer ' + this.authToken,
        },
      }
    );
  }

  public getGame(id: number): Observable<Game[]> {
    return this.httpClient.post<Game[]>(
      `${this.cors_api_host}${this.baseURL}`,
      `fields platforms.name, platforms.abbreviation, videos.video_id, cover.url, screenshots.url , artworks.url, genres.name, summary, name; where id = ${id};`,
      {
        headers: {
          'Client-ID': this.clientID,
          Authorization: `Bearer ${this.authToken}`,
        },
      }
    );
  }
}
