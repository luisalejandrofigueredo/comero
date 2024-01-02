import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { VitalSignsService } from "./services/vital-signs.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subscription } from 'rxjs';
import { MessageDocument } from './interfaces/messageDocument';
import { Socket } from 'ngx-socket-io';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from './services/auth.service';
import { ChatService } from "./services/chat.service";
import { ChatDocument } from "./interfaces/chat-document";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Comero';
  private vitalSingsService = inject(VitalSignsService);
  private socket = inject(Socket);
  private messagesEventSubscription$: Subscription | undefined;
  private messageEvent$: Observable<MessageDocument> = this.socket.fromEvent<MessageDocument>("newChat");
  private authService = inject(AuthService);
  private matSnackBar = inject(MatSnackBar);
  private chatService = inject(ChatService);
  private angularFireAuth = inject(AngularFireAuth);
  private chat$: Subscription | undefined;
  private angularFireAuth$: Subscription | undefined;
  ngOnInit(): void {
    this.angularFireAuth$=this.angularFireAuth.idToken.subscribe({
      next: (token: string | null) => {
        //handle idToken changes here. Note, that user will be null if there is no currently logged in user
        if (token !== null) {
          const { uid, displayName, photoURL } = this.authService.getUserData();
          this.chat$ = this.chatService.addChat({ uid: uid, name: displayName, avatar: photoURL }).subscribe({
            next: (sub: ChatDocument) => {
              if (sub !== null) {
                this.chatService.chat_uuid = sub.uid;
                this.matSnackBar.open($localize `:@@ingreso:Ingreso`,$localize `:@@acceso_concedido:Acceso concedido y agregado al chat`, { duration: 10000 });
              }
            }
          })
        }
      }
    })
  }

   async ngOnDestroy(): Promise<void> {
    await this.authService.SignOut().then((_result)=>{
      this.unSubscribe();
    }).catch((_reason)=>{
      this.unSubscribe();
    })
  }
  
  unSubscribe(){
    this.messagesEventSubscription$?.unsubscribe();
    this.chat$?.unsubscribe();
    this.angularFireAuth$?.unsubscribe();
  }
}
