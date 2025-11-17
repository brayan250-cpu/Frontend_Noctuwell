import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  ruta_servidor = "http://localhost:8080/noctuwell";
  recurso = "appointments";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.ruta_servidor}/${this.recurso}`);
  }

  getById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }

  new(app: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.ruta_servidor}/${this.recurso}`, app);
  }

  edit(app: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.ruta_servidor}/${this.recurso}/${app.id}`, app);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }
}
