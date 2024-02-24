// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL: string = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable().pipe(shareReplay(1));
  }

  constructor(private http: HttpClient) {}

  login(id: string, password: string): Observable<any> {
    const loginData = { id, password };
    const headers = new HttpHeaders().set('X-Exclude-Loader', 'true');
    return this.http.post<any>(`${this.apiURL}/login`, loginData, { headers });
  }

  signUp(
    email: string,
    username: string,
    name: string,
    password: string
  ): Observable<any> {
    const userData = { email, username, name, password };
    const headers = new HttpHeaders().set('X-Exclude-Loader', 'true');
    return this.http.post<any>(`${this.apiURL}/user`, userData, { headers });
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userID');

    this.setLoggedIn(false);
    window.location.reload();
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  getLoggedInValue(): boolean {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.setLoggedIn(true);
    }
    return this.loggedIn.getValue();
  }
}
