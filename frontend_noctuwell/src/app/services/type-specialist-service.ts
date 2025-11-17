import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeSpecialist } from '../models/type-specialist';

@Injectable({
  providedIn: 'root'
})
export class TypeSpecialistService {

  ruta_servidor: string = 'http://localhost:8080/noctuwell';
  recurso: string = 'typespecialists'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<TypeSpecialist[]> {
    return this.http.get<TypeSpecialist[]>(`${this.ruta_servidor}/${this.recurso}`);
  }

  getById(id: number): Observable<TypeSpecialist> {
    return this.http.get<TypeSpecialist>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }

  new(typeSpecialist: TypeSpecialist): Observable<TypeSpecialist> {
    return this.http.post<TypeSpecialist>(`${this.ruta_servidor}/${this.recurso}`, typeSpecialist);
  }

  edit(typeSpecialist: TypeSpecialist): Observable<TypeSpecialist> {
    return this.http.put<TypeSpecialist>(
      `${this.ruta_servidor}/${this.recurso}/${typeSpecialist.id}`,
      typeSpecialist
    );
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }
}
