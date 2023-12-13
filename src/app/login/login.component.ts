import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordVisible = false;
  private authService=inject(AuthService);
  profileForm = new FormGroup({
    login: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });

  cancel(){}

  async saveDialog(){
  await this.authService.SignIn(this.profileForm.controls.login.value,this.profileForm.controls.password.value)
}


}
