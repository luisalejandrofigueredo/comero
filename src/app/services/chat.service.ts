import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatDocument } from '../interfaces/chat-document';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private httpClient = inject(HttpClient)
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
    return this.httpClient.post<ChatDocument>(environment.url + '/chat/add', chat)
  }

  getChats(): Observable<ChatDocument[]> {
    return this.httpClient.get<ChatDocument[]>(environment.url + '/chat/getAll')
  }

  deleteChat(id: string): Observable<ChatDocument> {
    const params = new HttpParams().set('id', id);
    return this.httpClient.delete<ChatDocument>(environment.url + '/chat/delete',{params:params})
  }

  getChat(id:string): Observable<ChatDocument> {
    const params = new HttpParams().set('id', id);
    return this.httpClient.get<ChatDocument>(environment.url + '/chat/getOne',{params})
  }

}
