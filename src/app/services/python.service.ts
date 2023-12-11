import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PythonService {
  private httpClient = inject(HttpClient);

  constructor() { }
  callPython(number: number, numberTwo: number): Observable<{ message: string }> {
    const params = new HttpParams().set('number', number).set('numberTwo', numberTwo)
    return this.httpClient.get<{ message: string }>('http://localhost:5000', { params: params });
  }
}
