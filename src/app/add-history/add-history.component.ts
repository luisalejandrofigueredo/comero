import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HistoryService } from "../services/history.service";
import { AddTextHistoryComponent } from '../add-text-history/add-text-history.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-history',
  templateUrl: './add-history.component.html',
  styleUrl: './add-history.component.css'
})
export class AddHistoryComponent implements OnInit, OnDestroy {
  profileForm = new FormGroup({
    date: new FormControl<Date>({value:new Date(),disabled:true}, { nonNullable: true }),
    history: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });
  router = inject(Router);
  route = inject(ActivatedRoute);
  private matDialog = inject(MatDialog);
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
        this.router.navigate(['editPaciente', this.uuid,1]);
    }});
  }
  closeDialog() {
    this.router.navigate(['editPaciente', this.uuid,1]);
  }

  addText() {
    this.matDialog.open(AddTextHistoryComponent, { data: { uuid: this.uuid } }).afterClosed()
      .subscribe({
        next: (value)=>{
          if (value) {
            this.profileForm.controls.history.setValue(this.profileForm.controls.history.value + value)
          }
        },
      })
  }


  ngOnDestroy(): void {
    this.route$?.unsubscribe();
  }
}
