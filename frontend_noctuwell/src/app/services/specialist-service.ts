import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialist } from '../models/specialist';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  ruta_servidor: string = 'http://localhost:8080/noctuwell';
  recurso: string = 'specialists';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(`${this.ruta_servidor}/${this.recurso}`);
  }

  getById(id: number): Observable<Specialist> {
    return this.http.get<Specialist>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }

  new(specialist: Specialist): Observable<Specialist> {
    return this.http.post<Specialist>(`${this.ruta_servidor}/${this.recurso}`, specialist);
  }

  edit(specialist: Specialist): Observable<Specialist> {
    return this.http.put<Specialist>(`${this.ruta_servidor}/${this.recurso}/${specialist.id}`, specialist);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }
}
