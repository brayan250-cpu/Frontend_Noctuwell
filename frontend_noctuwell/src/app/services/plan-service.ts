import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  ruta_servidor: string = 'http://localhost:8080/noctuwell';
  recurso: string = 'plans';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.ruta_servidor}/${this.recurso}`);
  }

  getById(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }

  new(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(`${this.ruta_servidor}/${this.recurso}`, plan);
  }

  edit(plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${this.ruta_servidor}/${this.recurso}/${plan.id}`, plan);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }
}
