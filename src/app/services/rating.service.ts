import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private apiURL: string = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getRating(gameID: string) {
    const authToken = localStorage.getItem('authToken');
    const userID = localStorage.getItem('userID');
    const headers = new HttpHeaders()
      .set('X-Exclude-Loader', 'true')
      .set('Authorization', `Bearer ${authToken}`);
    return this.http.get<any>(
      `${this.apiURL}/user/${userID}/scores/${gameID}`,
      {
        headers,
      }
    );
  }

  setRating(gameID: string, score: number) {
    const rating = { score };
    const authToken = localStorage.getItem('authToken');
    const userID = localStorage.getItem('userID');
    const headers = new HttpHeaders()
      .set('X-Exclude-Loader', 'true')
      .set('Authorization', `Bearer ${authToken}`);
    return this.http.put<any>(
      `${this.apiURL}/user/${userID}/scores/${gameID}`,
      rating,
      {
        headers,
      }
    );
  }
}
