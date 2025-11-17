import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  ruta_servidor: string = 'http://localhost:8080/noctuwell';
  recurso: string = 'patients';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.ruta_servidor}/${this.recurso}`);
  }

  getById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }

  new(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.ruta_servidor}/${this.recurso}`, patient);
  }

  edit(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.ruta_servidor}/${this.recurso}/${patient.id}`, patient);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }
}
