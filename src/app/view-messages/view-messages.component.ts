import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MessagesService } from "../services/messages.service";
import { Subscription } from 'rxjs';
import { MessageDocument } from '../interfaces/messageDocument';
import {Socket} from 'ngx-socket-io'
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-view-messages',
  templateUrl: './view-messages.component.html',
  styleUrl: './view-messages.component.css'
})
export class ViewMessagesComponent implements OnInit, OnDestroy {
  private messagesService = inject(MessagesService);
  private authService=inject(AuthService);
  private socket=inject(Socket);
  private messagesService$: Subscription | undefined;
  private messageEvent$:Subscription|undefined
  public elementos: MessageDocument[] | undefined;
  ngOnInit(): void {
    this.messagesService$ = this.messagesService.getMessagesUser(this.authService.getUserData().uid).subscribe((document) => {
      this.elementos = document;
    })
    this.messageEvent$=this.socket.fromEvent('newChat').subscribe({next:(chat)=>{
      const messagesService$ = this.messagesService.getMessagesUser(this.authService.getUserData().uid).subscribe((document) => {
        this.elementos = document;
        messagesService$.unsubscribe();
      })
    }})
  }
  ngOnDestroy(): void {
    this.messagesService$?.unsubscribe();
    this.messageEvent$?.unsubscribe();
  }
}
