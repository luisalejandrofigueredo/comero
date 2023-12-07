import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { History } from "../interfaces/history";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HistoryDocument } from '../interfaces/history-document';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  httpClient = inject(HttpClient);
  constructor() { }
  addHistory(history: History): Observable<HistoryDocument> {
    return this.httpClient.post<HistoryDocument>(environment.url + '/history/add', history)
  }

  getHistory(id:string): Observable<HistoryDocument> {
    const params = new HttpParams().set('id', id);
    return this.httpClient.get<HistoryDocument>(environment.url + '/history/getOne',{params})
  }

  getHistory_s(id:string): Observable<HistoryDocument[]> {
    const params = new HttpParams().set('id', id);
    return this.httpClient.get<HistoryDocument[]>(environment.url + '/history/getall',{params})
  }

  deleteHistory(id: string): Observable<HistoryDocument> {
    const params = new HttpParams().set('id', id);
    return this.httpClient.delete<HistoryDocument>(environment.url + '/history/delete', { params });
  }

  putHistory(history:{ "id": string, "date": number, history:string } ): Observable<void> {
    return this.httpClient.put<void>(environment.url + '/history/put', history)
  }
}
