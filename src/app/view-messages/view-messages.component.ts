import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { MessagesService } from "../services/messages.service";
import { Observable, Subscription } from 'rxjs';
import { MessageDocument } from '../interfaces/messageDocument';
import { Socket } from 'ngx-socket-io'
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ChatDocument } from '../interfaces/chat-document';
@Component({
  selector: 'app-view-messages',
  templateUrl: './view-messages.component.html',
  styleUrl: './view-messages.component.css'
})
export class ViewMessagesComponent implements OnInit, OnDestroy,OnChanges {
  public messagesService = inject(MessagesService);
  public chatService = inject(ChatService);
  public authService = inject(AuthService);
  private socket = inject(Socket);
  private messagesService$: Subscription | undefined;
  public elementos: MessageDocument[] | undefined;
  private messagesEventSubscription$: Subscription | undefined;
  private messageEvent$: Observable<MessageDocument> = this.socket.fromEvent<MessageDocument>("newChat");
  @Input() from: string="";
  @Input() to: string="" ;
  ngOnInit(): void {
    this.messagesService$ = this.messagesService.getMessagesUserToUser(this.to, this.from).subscribe((document) => {
      this.elementos = document;
      console.log('elementos 1',this.elementos)
    })
    this.messagesEventSubscription$ = this.messageEvent$.subscribe({
      next: (chat) => {
        const messagesService$ = this.messagesService.getMessagesUserToUser(this.to,this.from).subscribe((document) => {
          this.elementos = document;
          console.log('elementos 2',this.elementos)
        })
      }
    }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    const messagesService$ = this.messagesService.getMessagesUserToUser(this.to,this.from).subscribe((document) => {
      this.elementos = document;
      console.log('elementos 3',this.to)
      console.log('elementos 3',this.from)
      console.log('elementos 3',this.elementos)
    })
  }


  ngOnDestroy(): void {
    this.messagesService$?.unsubscribe();
    this.messagesEventSubscription$?.unsubscribe();
  }
}
