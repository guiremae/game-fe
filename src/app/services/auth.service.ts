// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL: string = 'http:/192.168.1.45:8090';
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable().pipe(shareReplay(1));
  }

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(`${this.apiURL}/login`, loginData);
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  getLoggedInValue(): boolean {
    return this.loggedIn.getValue();
  }
}
