import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HistoryService } from "../services/history.service";

@Component({
  selector: 'app-add-history',
  templateUrl: './add-history.component.html',
  styleUrl: './add-history.component.css'
})
export class AddHistoryComponent implements OnInit, OnDestroy {
  profileForm = new FormGroup({
    date: new FormControl<Date>(new Date(), { nonNullable: true }),
    history: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });
  router = inject(Router);
  route = inject(ActivatedRoute);
  historyService = inject(HistoryService);
  private route$: Subscription | undefined;
  private uuid!: string;
  ngOnInit(): void {
    this.route$ = this.route.params.subscribe((value: Params) => {
      this.uuid = value['id'];
      this.profileForm.controls.date.disabled
    });
  }
  saveDialog() {
    this.historyService.addHistory({
      date: this.profileForm.controls.date.value.getTime(), idPatient: this.uuid,
      history:this.profileForm.controls.history.value
    }).subscribe({next:(historyDocument) => {
      console.log('history document',historyDocument)
        this.router.navigate(['editPaciente', this.uuid,1]);
    }});
  }
  closeDialog() {
    this.router.navigate(['editPaciente', this.uuid,1]);
  }

  ngOnDestroy(): void {
    this.route$?.unsubscribe();
  }
}
