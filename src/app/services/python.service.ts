import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PythonService {
  private httpClient = inject(HttpClient);
  public idToken:string|null='';

  constructor() { }


  callPython(number: number, numberTwo: number): Observable<{ message: string }> {
    const params = new HttpParams().set('number', number).set('numberTwo', numberTwo)
    return this.httpClient.get<{ message: string }>('http://localhost:5000', { params: params });
  }

  callAPI(){
    console.log('entre call api')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.idToken}`})
      this.httpClient.get('http://localhost:3000', { headers })
      .subscribe(
        (response) => {
          console.log('Respuesta de la API:', response);
          // Maneja la respuesta de la API según sea necesario
        },
        (error) => {
          console.error('Error al enviar el token a la API:', error);
          // Maneja el error en la comunicación con la API
        }
      );
  }



}
