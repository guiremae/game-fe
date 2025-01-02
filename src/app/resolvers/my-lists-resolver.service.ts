import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListService } from '../services/list.service';

@Injectable({
  providedIn: 'root',
})
export class MyListsResolverService {
  constructor(private listService: ListService, private router: Router) {}

  resolve(): Observable<any> {
    return this.listService.getLists().pipe(
      catchError((error) => {
        console.error('Error en el resolver:', error);
        this.router.navigate(['home']);
        return of(null);
      })
    );
  }
}
