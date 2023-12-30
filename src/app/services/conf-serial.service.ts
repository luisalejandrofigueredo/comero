import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfSerial } from "../interfaces/conf-serial";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfSerialService {
  private authService = inject(AuthService);
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<ConfSerial[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.get<ConfSerial[]>(environment.urlOrm + '/confSerial/getAll', { headers: headers })
  }

  addBed(bed: ConfSerial): Observable<ConfSerial> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.post<ConfSerial>(environment.urlOrm + '/confSerial/add', bed, { headers: headers });
  }

  editBed(bed: ConfSerial): Observable<ConfSerial> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.httpClient.post<ConfSerial>(environment.urlOrm + '/confSerial/edit', bed, { headers: headers });
  }

  getOne(id: number): Observable<ConfSerial> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    const params = new HttpParams().set('id', id.toString());
    return this.httpClient.get<ConfSerial>(environment.urlOrm + '/confSerial/getOne', { headers: headers, params: params })
  }

  delete(id: number): Observable<ConfSerial> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    const params = new HttpParams().set('id', id.toString());
    return this.httpClient.delete<ConfSerial>(environment.urlOrm + '/confSerial/delete', { headers: headers, params: params })
  }


}
