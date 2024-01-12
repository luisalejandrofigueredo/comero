import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MathCalculusService } from "../services/math-calculus.service";
@Component({
  selector: 'app-test-python',
  templateUrl: './test-python.component.html',
  styleUrls: ['./test-python.component.css']
})
export class TestPythonComponent implements OnInit {
  document!:{pressure:number};
  mean=''
  pressure=signal<{pressure:number}[]>([]);
  profileForm = new FormGroup({
    pressure: new FormControl<number>(0, { nonNullable: true,validators: Validators.required })
  });
  constructor(private matCalculusService:MathCalculusService) { }

  ngOnInit() {
    this.matCalculusService.getService('mean').subscribe((mean)=>{
      this.mean=mean;
    })
  }

  emit(){
    console.log('resultado:',JSON.stringify(this.pressure()));
     this.matCalculusService.emitService('calcMean',JSON.stringify(this.pressure()))
  }
  
  saveDialog(){
    this.document=this.profileForm.getRawValue()
    this.pressure.update((array)=>[...array,this.document])
  }

  closeDialog(){}

}
