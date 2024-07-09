// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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

  constructor(private http: HttpClient, private router: Router) {}

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
          // Clear the local storage or any other storage mechanism
          localStorage.removeItem('authToken');
          localStorage.removeItem('userID');
          // Update the authentication state
          this.setLoggedIn(false);
          // Redirect to the login page
          if (!isRefreshToken) {
            window.location.reload();
          }
          this.router
            .navigateByUrl('/latest', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/latest'], {
                state: { openLoginModal: true },
              });
            });
        }),
        catchError((error) => {
          console.error('Logout request failed', error);
          return of(null); // Continue regardless of error
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
    const body = { refreshToken: localStorage.getItem('authToken') };
    const headers = new HttpHeaders().set('X-Exclude-Loader', 'true');
    return this.http.post<any>(`${this.apiURL}/refresh`, body, { headers });
  }
}
