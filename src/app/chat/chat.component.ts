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
  public authService=inject(AuthService)
  
  ngOnInit(): void {
    this.chatService$ = this.chatService.getChats().subscribe((documents) => {
      const newDocuments=this.eliminarCampos(documents);
      const arraySinDuplicados = this.eliminarDuplicados(newDocuments,"uid","avatar")
      console.log('sin duplicados',arraySinDuplicados)
      this.documents = arraySinDuplicados;
    });
  }

  eliminarDuplicados(arr:any, prop1:any, prop2:any) {
    return arr.filter((obj:any, index:any, self:any) =>
      index === self.findIndex((o:any) =>
        o[prop1] === obj[prop1] && o[prop2] === obj[prop2]
      )
    );
  }

  eliminarCampos(array:ChatDocument[]):any {
    var newArray=[]
    for (let index = 0; index < array.length; index++) {
      var element =   JSON.parse(JSON.stringify(array[index]));
      delete element.id,
      delete element._attachments,
      delete element._deleted
      delete element._meta
      delete element._rev
      newArray.push(element)
    }
    return newArray;
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