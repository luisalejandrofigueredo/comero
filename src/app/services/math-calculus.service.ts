import { Injectable } from '@angular/core';
import { pythonsocketService } from './pythonsocket.service';
import { Observable } from 'rxjs';
interface mean {
  min: number,
  max: number,
  file: string
}
@Injectable({
  providedIn: 'root'
})
export class MathCalculusService {

  constructor(private socketService: pythonsocketService) { }
  getService(eventName: string): Observable<mean> {
    return this.socketService.fromEvent(eventName)
  }
  emitService(eventName: string, document: string) {
    this.socketService.emit(eventName, document)
  }
}
