import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatDocument } from '../interfaces/chat-document';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {AuthService  } from "./auth.service";
@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private httpClient = inject(HttpClient);
  private authService=inject(AuthService);
  private chatID: string = '';

  constructor() {
    if (localStorage.getItem('chat')!==null){
      this.chatID!=localStorage.getItem('chat');
    }
   }

  set chat_uuid(uuid: string) {
    localStorage.setItem('chat',uuid);
    this.chatID = uuid;
  }

  get chat_uuid(): string {
    return this.chatID
  }

  logout(){
    localStorage.removeItem('chat');
    this.chatID =''
  }

  addChat(chat: { uid: string, name: string, avatar: string }): Observable<ChatDocument> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.post<ChatDocument>(environment.url + '/chat/add', chat,{headers:headers})
  }

  getChats(): Observable<ChatDocument[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.get<ChatDocument[]>(environment.url + '/chat/getAll',{headers:headers})
  }

  deleteChat(id: string): Observable<ChatDocument> {
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.delete<ChatDocument>(environment.url + '/chat/delete',{params:params, headers:headers})
  }

  getChat(id:string): Observable<ChatDocument> {
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.get<ChatDocument>(environment.url + '/chat/getOne',{params,headers:headers})
  }

}
