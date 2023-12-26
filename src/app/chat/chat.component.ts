import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ChatService } from "../services/chat.service";
import { ChatDocument } from "../interfaces/chat-document";
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MessageChatComponent  } from "../message-chat/message-chat.component";
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../services/messages.service';
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
  public viewMessages:boolean=false;
  public getChat$: Subscription | undefined;
  public currentChat:ChatDocument|undefined;
  public messagesService = inject(MessagesService);
  profileForm = new FormGroup({
    message: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  })
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
    this.getChat$=this.chatService.getChat(uid).subscribe((chat:ChatDocument)=>{
      this.from=uid;
      this.to=this.authService.getUserData().uid
      this.currentChat=chat;
      this.viewMessages=true;
    })
  }


  enviar(){
    this.messagesService.addMessage({to:this.to,from:this.from,message:this.profileForm.controls.message.value,hour:new Date().toISOString()}).subscribe(()=>{
      this.to=this.to;
      this.from=this.from;
      this.profileForm.controls.message.setValue('');
    })


  }

  verContactos(){
    this.from="";
    this.to=""
    this.viewMessages=false;
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