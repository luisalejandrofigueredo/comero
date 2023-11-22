import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Patient } from "./patient";
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { PatientDocument } from "./patient-document";
@Injectable({
  providedIn: 'root'
})
export class VitalSignsService {
  public count:WritableSignal<number> = signal(0);
  constructor(private httpClient: HttpClient) { }
  addPatient(patient: Patient): Observable<Patient> {
    this.count.update((count)=> count+1)
    return this.httpClient.post<Patient>(environment.url + '/emergency/add', patient)
  }
  
  getPatients(): Observable<PatientDocument[]> {
    return this.httpClient.get<PatientDocument[]>(environment.url + '/emergency/getall')
  }
  putPatient(patient:{"id":string,"bloodPressureMax": number,"bloodPressureMin": number,"pulse": number}):Observable<void>{
    return this.httpClient.put<void>(environment.url + '/emergency/put',patient)
  }

}
