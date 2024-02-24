// auth.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiURL: string = `${environment.apiUrl}/list`;

  constructor(private http: HttpClient) {}

  getLists(): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const username = localStorage.getItem('userName');
    const headers = new HttpHeaders()
      .set('X-Exclude-Loader', 'true')
      .set('Authorization', `Bearer ${authToken}`);
    return this.http.get<any>(`${this.apiURL}/title?user=${username}`, {
      headers,
    });
  }

  getListInfo(listID: string): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders()
      .set('X-Exclude-Loader', 'true')
      .set('Authorization', `Bearer ${authToken}`);
    return this.http.get<any>(`${this.apiURL}/${listID}`, {
      headers,
    });
  }

  createList(
    title: string,
    owner: string,
    users: string[],
    games: string[]
  ): Observable<any> {
    const listData = { title, owner, users, games };
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders()
      .set('X-Exclude-Loader', 'true')
      .set('Authorization', `Bearer ${authToken}`);
    return this.http.post<any>(`${this.apiURL}`, listData, { headers });
  }

  deleteList(listID: string) {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders()
      .set('X-Exclude-Loader', 'true')
      .set('Authorization', `Bearer ${authToken}`);
    return this.http.delete<any>(`${this.apiURL}/${listID}`, { headers });
  }

  addGame(listID: string, gameID: string): Observable<any> {
    const authToken = localStorage.getItem('authToken');

    const headers = new HttpHeaders()
      .set('X-Exclude-Loader', 'true')
      .set('Authorization', `Bearer ${authToken}`);

    return this.http.patch<any>(
      `${this.apiURL}/${listID}/game/${gameID}`,
      {},
      {
        headers,
      }
    );
  }

  updateList(list: {
    title: string;
    owner: string;
    users: any[];
    games: any[];
    id: string;
  }): Observable<any> {
    const authToken = localStorage.getItem('authToken');

    const headers = new HttpHeaders()
      .set('X-Exclude-Loader', 'true')
      .set('Authorization', `Bearer ${authToken}`);

    return this.http.put<any>(`${this.apiURL}/${list.id}`, list, {
      headers,
    });
  }
}
