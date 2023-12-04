import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicamentos } from "./medicamentos";
import { MedicamentosDocument } from "./medicamentos-document";
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  httpClient = inject(HttpClient)
  constructor() { }

  addMedicamento(medicamento: Medicamentos): Observable<MedicamentosDocument> {
    return this.httpClient.post<MedicamentosDocument>(environment.url + '/medication/add', medicamento)
  }

  getMedicamentos(id:string): Observable<MedicamentosDocument[]> {
    const params = new HttpParams().set('id', id);
    return this.httpClient.get<MedicamentosDocument[]>(environment.url + '/medication/getall',{params})
  }

  deleteMedicamento(id: string): Observable<MedicamentosDocument> {
    const params = new HttpParams().set('id', id);
    return this.httpClient.delete<MedicamentosDocument>(environment.url + '/medication/delete', { params });
  }
  

}
