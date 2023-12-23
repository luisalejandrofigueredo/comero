import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ChatService } from "../services/chat.service";
import { ChatDocument } from "../interfaces/chat-document";
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MessageChatComponent  } from "../message-chat/message-chat.component";
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  public chatService = inject(ChatService);
  public documents: any = [];
  public chatService$: Subscription | undefined;
  public matDialog=inject(MatDialog);
  public authService=inject(AuthService);
  public from:string="";
  public to:string="";
  
  ngOnInit(): void {
    this.chatService$ = this.chatService.getChats().subscribe((documents) => {
      this.documents = documents;
    });
  }

  openNewMessages(uid:string) {
    this.matDialog.open(MessageChatComponent,{data: {id:uid}}).afterClosed().subscribe(()=>{
      this.from=uid;
      this.to=this.authService.getUserData().uid
    })
  }

  verMensajes(uid:string){
    this.from=uid;
    this.to=this.authService.getUserData().uid
  }


  ngOnDestroy(): void {
    this.chatService$?.unsubscribe();
  }

  openMessages(id:string) {
    console.log('chat component open id',id)
    this.matDialog.open(MessageChatComponent,{data:{id:id}}).afterOpened().subscribe((_result:any)=>{
      

    })
  }
}