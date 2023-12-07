import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrl: './edit-history.component.css'
})
export class EditHistoryComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private historyService = inject(HistoryService);
  private router = inject(Router);
  private route$: Subscription | undefined
  private uuid!: string;
  private idPatient!:string;
  profileForm = new FormGroup({
    date: new FormControl<number>(new Date().getTime(), { nonNullable: true, validators: Validators.required }),
    history: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });
  ngOnInit(): void {
    this.route$ = this.activatedRoute.params.subscribe((value: Params) => {
      this.uuid = value['id'];
      this.historyService.getHistory(this.uuid).subscribe((history) => {
        this.idPatient=history.idPatient;
        this.profileForm.patchValue({
          date: history.date,
          history: history.history
        })
      })
    })
  }

  saveDialog() {
    this.historyService.putHistory({
      id: this.uuid,
      date: this.profileForm.controls.date.value,
      history: this.profileForm.controls.history.value
    }).subscribe((data) => {
      console.log('data',data)
      this.router.navigate(['editPaciente', this.idPatient, 1]);
    })
  }

  closeDialog() {
    this.router.navigate(['editPaciente', this.idPatient, 1]);
  }

  ngOnDestroy(): void {
    this.route$?.unsubscribe;
  }

}
