import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HistoryService } from '../services/history.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddTextHistoryComponent } from "../add-text-history/add-text-history.component";
@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrl: './edit-history.component.css'
})
export class EditHistoryComponent implements OnInit, OnDestroy {
  private matDialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private activatedRoute = inject(ActivatedRoute);
  private historyService = inject(HistoryService);
  private router = inject(Router);
  private route$: Subscription | undefined
  private uuid!: string;
  private idPatient!: string;
  profileForm = new FormGroup({
    date: new FormControl<Date>({disabled:true,value:new Date()}, { nonNullable: true, validators: Validators.required }),
    history: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });
  ngOnInit(): void {
    this.route$ = this.activatedRoute.params.subscribe((value: Params) => {
      this.uuid = value['id'];
      this.historyService.getHistory(this.uuid).subscribe((history) => {
        this.idPatient = history.idPatient;
        if (this.compareDate(history.date, new Date().getTime()) === false) {
          this.snackBar.open('Esa historia ya no puede ser modificada', '', { duration: 1000 })
          this.router.navigate(['editPaciente', this.idPatient, 1]);
        }
        this.profileForm.patchValue({
          date: new Date(history.date),
          history: history.history
        })
      })
    })
  }

  compareDate(date: number, secondDate: number): boolean {
    if (new Date(date).getDate() !== new Date(secondDate).getDate()) {
      return false
    }
    if (new Date(date).getMonth() !== new Date(secondDate).getMonth()) {
      return false
    }
    if (new Date(date).getFullYear() !== new Date(secondDate).getFullYear()) {
      return false
    }
    return true
  }

  saveDialog() {
    this.historyService.putHistory({
      id: this.uuid,
      date: this.profileForm.controls.date.value.getTime(),
      history: this.profileForm.controls.history.value
    }).subscribe((data) => {
      this.router.navigate(['editPaciente', this.idPatient, 1]);
    })
  }

  addText() {
    this.matDialog.open(AddTextHistoryComponent, { data: { uuid: this.idPatient } }).afterClosed()
      .subscribe({
        next: (value)=>{
          if (value) {
            this.profileForm.controls.history.setValue(this.profileForm.controls.history.value + value)
          }
        },
      })
  }

  closeDialog() {
    this.router.navigate(['editPaciente', this.idPatient, 1]);
  }

  ngOnDestroy(): void {
    this.route$?.unsubscribe;
  }

}
