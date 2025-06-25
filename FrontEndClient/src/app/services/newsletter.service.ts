import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private baseUrl = 'http://localhost:8080/subscribers/ajouter';

  constructor(private http: HttpClient) { }

  subscribe(email: string): Observable<any> {
    const subscriber = { email: email };
    return this.http.post(`${this.baseUrl}`, subscriber);
  }
}
