import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatService } from "../services/chat.service";
import { ChatDocument } from '../interfaces/chat-document';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../services/messages.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-message-chat',
  templateUrl: './message-chat.component.html',
  styleUrl: './message-chat.component.css'
})
export class MessageChatComponent implements OnInit, OnDestroy {
  public chatService = inject(ChatService);
  public messagesService = inject(MessagesService);
  public chatDocument: ChatDocument | undefined;
  public chatService$: Subscription | undefined;
  public authService= inject(AuthService);
  profileForm = new FormGroup({
    message: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string }, private dialogRef: MatDialogRef<MessageChatComponent>) { }
  ngOnInit(): void {
    this.chatService$ = this.chatService.getChat(this.data.id).subscribe((chatDocument: ChatDocument) => {
      this.chatDocument = chatDocument;
    })
  }

  ngOnDestroy(): void {
    this.chatService$?.unsubscribe();
  }

  sendMessage() {
    this.messagesService.addMessage({
      hour: new Date().getTime(),
      from: this.authService.getUserData()?.uid,
      to: this.chatDocument?.uid!,
      message: this.profileForm.controls.message.value
    }).subscribe((_document)=>{
      this.dialogRef.close(true);
    })
  }
}
