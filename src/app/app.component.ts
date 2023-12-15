import { Component, OnInit, inject } from '@angular/core';
import { VitalSignsService } from "./services/vital-signs.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'comero';
  private vitalSingsService = inject(VitalSignsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.vitalSingsService.getPatients().subscribe((registros) => {
      this.vitalSingsService.count.set(registros.length);
    })
  }
}
