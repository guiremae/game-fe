// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL: string = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable().pipe(shareReplay(1));
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

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
    return this.http.post<any>(`${this.apiURL}/users`, userData, { headers });
  }

  logout(isRefreshToken: boolean): void {
    const headers = new HttpHeaders().set('X-Exclude-Loader', 'true');
    this.http
      .post<any>(`${this.apiURL}/logout`, {}, { headers })
      .pipe(
        tap(() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userID');
          this.setLoggedIn(false);
          let message = 'Se ha cerrado la sesión';
          let panelClass = ['app-notification-success', 'center'];
          if (isRefreshToken) {
            message = 'La sesión ha expirado';
            panelClass = ['app-notification-error', 'center'];
          }
          this._snackBar.open(message, undefined, {
            duration: 2000,
            panelClass,
          });
          this.router.navigate(['/login']);
        }),
        catchError((error) => {
          console.error('Logout request failed', error);
          return of(null);
        })
      )
      .subscribe();
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

  activateUser(userID: string, token: string): Observable<any> {
    return this.http.patch<any>(
      `${this.apiURL}/users/${userID}/activate?token=${token}`,
      undefined
    );
  }

  refreshToken() {
    const body = { refreshToken: localStorage.getItem('refreshToken') };
    const headers = new HttpHeaders().set('X-Exclude-Loader', 'true');
    return this.http.post<any>(`${this.apiURL}/refresh`, body, { headers });
  }

  sendRequestPassword(userID: string, email: string) {
    const body = { email };
    const headers = new HttpHeaders().set('X-Exclude-Loader', 'true');
    return this.http.put<any>(`${this.apiURL}/users/${userID}/remember`, body, {
      headers,
    });
  }

  checkIfAbleToResetPassword(userID: string, token: string) {
    const headers = new HttpHeaders().set('X-Exclude-Loader', 'true');
    return this.http.get<any>(
      `${this.apiURL}/users/${userID}/resetPassword?token=${token}`,
      { headers }
    );
  }

  resetPassword(userID: string, token: string, password: string) {
    const body = { password };
    const headers = new HttpHeaders().set('X-Exclude-Loader', 'true');
    return this.http.patch<any>(
      `${this.apiURL}/users/${userID}/resetPassword?token=${token}`,
      body,
      { headers }
    );
  }
}
