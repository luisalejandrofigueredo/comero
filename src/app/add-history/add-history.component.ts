import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-history',
  templateUrl: './add-history.component.html',
  styleUrl: './add-history.component.css'
})
export class AddHistoryComponent implements OnInit,OnDestroy {
  profileForm = new FormGroup({
    date: new FormControl<number>(new Date().getTime(), { nonNullable: true, validators: Validators.required }),
    history: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });
  router = inject(Router);
  route = inject(ActivatedRoute);
  private route$: Subscription | undefined;
  private uuid!: string;
  ngOnInit(): void {
    this.route$ = this.route.params.subscribe((value: Params) => {
      this.uuid = value['id'];
    });
  }
  saveDialog() {
    this.router.navigate(['editPaciente', this.uuid]);
  }
  closeDialog() {
    this.router.navigate(['editPaciente', this.uuid]);
   }

  ngOnDestroy(): void {
    this.route$?.unsubscribe();
  }
}
