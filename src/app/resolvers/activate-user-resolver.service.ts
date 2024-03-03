import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ActivateUserResolver {
  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const userID = route.paramMap.get('userID') ?? '';
    const token = route.paramMap.get('token') ?? '';
    return this.authService.activateUser(userID, token);
  }
}
