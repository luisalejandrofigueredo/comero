import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfSerialService } from "../services/conf-serial.service";
import {Router  } from "@angular/router";
@Component({
  selector: 'app-add-bed',
  templateUrl: './add-bed.component.html',
  styleUrl: './add-bed.component.css'
})
export class AddBedComponent {
  public signosVitales:string[]=[$localize `:@@pulso:Pulso`,$localize `:@@presion:Presión`,$localize `:@@oxigeno:Oxígeno`];
  private confSerialService = inject(ConfSerialService);
  private router =inject(Router)
  profileForm = new FormGroup({
    serial: new FormControl<string>('', { nonNullable: true,validators: Validators.required }),
    sign: new FormControl<string>('',{nonNullable:true}),
    bed: new FormControl<string>('', { nonNullable: true })
  });

  saveDialog() {
    this.confSerialService.addBed({
      bed: this.profileForm.controls.bed.value,
      sign: this.profileForm.controls.sign.value,
      serial: this.profileForm.controls.serial.value
    }).subscribe({next:(_newBed)=>{
      this.router.navigate(['confSerial']);
    }})
  }

  closeDialog() { 
    this.router.navigate(['confSerial']);
  }

}
