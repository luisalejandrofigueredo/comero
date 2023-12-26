import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {EstadoPacientesService} from '../services/estado-pacientes.service';


@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit{

  private breakpointObserver = inject(BreakpointObserver);
  public estadoPaciente= inject(EstadoPacientesService);
  public nPatients$:Subscription | undefined
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    
    
  }
}
