import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginComponent {
  passwordVisible = false;
  public authService = inject(AuthService);
  profileForm = new FormGroup({
    login: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });

  cancel() { }

  async saveDialog() {
    await this.authService.SignIn(this.profileForm.controls.login.value, this.profileForm.controls.password.value)
  }

  async logout(){
    await this.authService.SignOut()
  }

  async loginGoogle(){
    await this.authService.GoogleAuth()
  }
}
