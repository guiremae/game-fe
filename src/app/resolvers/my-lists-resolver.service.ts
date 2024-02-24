import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
        // Redirigir a otra ruta en caso de fallo
        this.router.navigate(['latest']);
        // Devolver un observable vacío o null para indicar que el resolver ha terminado
        return of(null);
      })
    );
  }
}
