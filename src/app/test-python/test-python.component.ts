import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MathCalculusService } from "../services/math-calculus.service";
import { ChartComponent } from "../chart/chart.component";
import { MatDialog } from '@angular/material/dialog';
import { environment } from "../../environments/environment";
@Component({
  selector: 'app-test-python',
  templateUrl: './test-python.component.html',
  styleUrls: ['./test-python.component.css']
})
export class TestPythonComponent implements OnInit {
  document!: { pressure_min: number, pressure_max: number };
  mean = '';
  file='';
  pressure = signal<{ pressure_min: number, pressure_max: number }[]>([]);
  profileForm = new FormGroup({
    pressure_min: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
    pressure_max: new FormControl<number>(0, { nonNullable: true, validators: Validators.required })
  });
  constructor(private matDialog: MatDialog, private matCalculusService: MathCalculusService) { }

  ngOnInit() {
    this.matCalculusService.getService('mean').subscribe((mean) => {
      console.log('mean',mean)
      this.mean = mean.min.toString() + ' ' + mean.max.toString();
      this.file= environment.url+'/charts/getChart?id='+mean.file
    })
  }

  emit() {
    console.log('resultado:', JSON.stringify(this.pressure()));
    this.matCalculusService.emitService('calcMean', JSON.stringify(this.pressure()))
  }

  show_chart() {
    const dialogRef = this.matDialog.open(ChartComponent, {
    data:this.file,enterAnimationDuration:500,hasBackdrop:false,disableClose:true });
  }

  saveDialog() {
    this.document = this.profileForm.getRawValue()
    this.pressure.update((array) => [...array, this.document])
  }

  closeDialog() { }

}
