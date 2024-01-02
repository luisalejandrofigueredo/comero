import { ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../services/auth.service";
import { ChatService } from "../services/chat.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ChatDocument } from '../interfaces/chat-document';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginComponent implements OnDestroy {
  passwordVisible = false;
  private matSnackBar = inject(MatSnackBar);
  public authService = inject(AuthService);
  public chatService = inject(ChatService);
  private chat$: Subscription | undefined;
  private chatDelete$: Subscription | undefined;
  profileForm = new FormGroup({
    login: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });

  cancel() { }

  async saveDialog() {
    await this.authService.SignIn(this.profileForm.controls.login.value, this.profileForm.controls.password.value)
  }

  async logout() {
    await this.authService.SignOut()
    this.chatDelete$ = this.chatService.deleteChat(this.chatService.chat_uuid).subscribe((subscribe) => {
      this.chatService.logout();
      this.matSnackBar.open($localize`:@@salio:Salió`,$localize `:@@acceso_desactivado:Acceso desactivado y borrado del chat`, { duration: 10000 });
    })
  }

  async loginGoogle() {
    await this.authService.GoogleAuth();
  }

  ngOnDestroy(): void {
    this.chat$?.unsubscribe();
    this.chatDelete$?.unsubscribe();
  }
}