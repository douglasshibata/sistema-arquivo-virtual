import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { System } from '../models/system';

@Injectable({
  providedIn: 'root'
})
export class SystemManagerService {

  private BASE_URL = environment.baseURL;

  constructor(private httpCLient: HttpClient) { }


  getSystem(): Observable<System[]> {
    return this.httpCLient.get<System[]>(`${this.BASE_URL}/system`);
  }

  persist(system: System) {
    return this.httpCLient.post(`${this.BASE_URL}/system`, system);
  }
  remove(id: number) {
    return this.httpCLient.delete(`${this.BASE_URL}/system/${id}`);
  }
}
