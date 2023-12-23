import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal,inject } from '@angular/core';
import { Patient } from "../patient";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PatientDocument } from "../patient-document";
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class VitalSignsService {
  public count: WritableSignal<number> = signal(0);
  private authService=inject(AuthService);
  constructor(private httpClient: HttpClient) { }
  getPatient(id: string): Observable<Patient> {
    const params = new HttpParams().set('id', id)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.get<Patient>(environment.url + '/emergency/getOne', { params,headers:headers })
  }
  
  addPatient(patient: Patient): Observable<Patient> {
    this.count.update((count) => count + 1)
    patient.firstName=encodeURI(patient.firstName);
    patient.lastName=encodeURI(patient.lastName)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.post<Patient>(environment.url + '/emergency/add', patient,{headers:headers})
  }

  deletePatient(id: string): Observable<Patient> {
    const params = new HttpParams().set('id', id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    this.count.update((count) => count - 1);
    return this.httpClient.delete<Patient>(environment.url + '/emergency/delete', { params,headers });
  }

  getPatients(): Observable<PatientDocument[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.get<PatientDocument[]>(environment.url + '/emergency/getall',{headers:headers})
  }

  putPatient(patient: { "id": string, firstName:string, lastName:string,"bloodPressureMax": number, "bloodPressureMin": number, "pulse": number,oxygen:number}): Observable<void> {
    patient.firstName=encodeURI(patient.firstName);
    patient.lastName=encodeURI(patient.lastName);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.put<void>(environment.url + '/emergency/put', patient,{headers:headers})
  }

}
