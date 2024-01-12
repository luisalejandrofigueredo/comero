import { Injectable } from '@angular/core';
import {Socket  } from "ngx-socket-io";
@Injectable()

export class pythonsocketService extends Socket{

constructor() {
  super( {url:'http://localhost:5000',options: { withCredentials: true }})
 }
}
