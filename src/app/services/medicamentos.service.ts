import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicamentos } from "../medicamentos";
import { MedicamentosDocument } from "../medicamentos-document";
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  httpClient = inject(HttpClient);
  authService=inject(AuthService);
  constructor() { }

  addMedicamento(medicamento: Medicamentos): Observable<MedicamentosDocument> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.post<MedicamentosDocument>(environment.url + '/medication/add', medicamento,{headers:headers})
  }

  getMedicamentos(id:string): Observable<MedicamentosDocument[]> {
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.get<MedicamentosDocument[]>(environment.url + '/medication/getall',{params,headers:headers})
  }

  deleteMedicamento(id: string): Observable<MedicamentosDocument> {
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.delete<MedicamentosDocument>(environment.url + '/medication/delete', { params,headers:headers });
  }  

}
