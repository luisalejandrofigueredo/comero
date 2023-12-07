import { Component, OnInit, inject } from '@angular/core';
import { VitalSignsService } from "./services/vital-signs.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'comero';
  private vitalSingsService=inject(VitalSignsService);

  ngOnInit(): void {
    this.vitalSingsService.getPatients().subscribe((registros)=>{
      this.vitalSingsService.count.set(registros.length);
    })
    
  }

}
