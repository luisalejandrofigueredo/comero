import { Component,inject } from '@angular/core';
import { PythonService } from "../services/python.service";
@Component({
  selector: 'app-com-python',
  templateUrl: './com-python.component.html',
  styleUrl: './com-python.component.css'
})
export class ComPythonComponent {
  pythonMath=inject(PythonService);
  message:string='';
  llamarPython(){
    this.pythonMath.callPython(5,8).subscribe({next:message=>{
      this.message=message.message;
    }})

  }

}
