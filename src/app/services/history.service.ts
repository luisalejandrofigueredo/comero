import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { History } from "../interfaces/history";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HistoryDocument } from '../interfaces/history-document';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  httpClient = inject(HttpClient);
  private authService=inject(AuthService);

  constructor() { }
  addHistory(history: History): Observable<HistoryDocument> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.post<HistoryDocument>(environment.url + '/history/add', history,{headers:headers})
  }

  getHistory(id:string): Observable<HistoryDocument> {
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.get<HistoryDocument>(environment.url + '/history/getOne',{params,headers:headers})
  }

  getHistory_s(id:string): Observable<HistoryDocument[]> {
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.get<HistoryDocument[]>(environment.url + '/history/getall',{params,headers:headers})
  }

  deleteHistory(id: string): Observable<HistoryDocument> {
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.delete<HistoryDocument>(environment.url + '/history/delete', { params,headers:headers });
  }

  putHistory(history:{ "id": string, "date": number, history:string } ): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.put<void>(environment.url + '/history/put', history,{headers:headers})
  }
}
