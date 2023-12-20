import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MessageDocument } from '../interfaces/messageDocument';
import { Messages } from "../interfaces/messages";
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  httpClient=inject(HttpClient);
  constructor() { }
  addMessage(message: Messages): Observable<MessageDocument> {
    return this.httpClient.post<MessageDocument>(environment.url + '/message/add', message)
  }

  getMessages(): Observable<MessageDocument[]> {
    return this.httpClient.get<MessageDocument[]>(environment.url + '/message/getAll')
  }

  getMessagesUser(id:string):Observable<MessageDocument[]>{
    const params = new HttpParams().set('id', id);
    return this.httpClient.get<MessageDocument[]>(environment.url + '/message/getFromTo',{params:params})
  }
}
