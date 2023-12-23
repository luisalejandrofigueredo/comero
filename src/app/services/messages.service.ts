import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MessageDocument } from '../interfaces/messageDocument';
import { Messages } from "../interfaces/messages";
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  httpClient=inject(HttpClient);
  authService=inject(AuthService);
  constructor() { }
  addMessage(message: Messages): Observable<MessageDocument> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.post<MessageDocument>(environment.url + '/message/add', message,{headers:headers})
  }

  getMessages(): Observable<MessageDocument[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.get<MessageDocument[]>(environment.url + '/message/getAll',{headers:headers})
  }

  getMessagesUser(id:string):Observable<MessageDocument[]>{
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.get<MessageDocument[]>(environment.url + '/message/getFromTo',{params:params,headers:headers})
  }

  getMessagesUserToUser(to:string,from:string):Observable<MessageDocument[]>{
    const params = new HttpParams().set('to',to).set('from',from);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.get<MessageDocument[]>(environment.url + '/message/getFromToMessages',{params:params,headers:headers})
  }
}
