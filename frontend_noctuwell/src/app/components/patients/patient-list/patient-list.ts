import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient-service';
import { Patient } from '../../../models/patient';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.css']
})
export class PatientListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'birthdate', 'acciones'];
  dsPatients = new MatTableDataSource<Patient>();

  constructor(
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.patientService.getAll().subscribe({
      next: data => {
        this.dsPatients.data = data;
      },
      error: err => {
        this.snackBar.open('Error al cargar pacientes', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsPatients.filter = filterValue.trim().toLowerCase();
  }

  nuevoPaciente(): void {
    this.router.navigate(['/patient-add']);
  }

  editarPaciente(id: number): void {
    this.router.navigate(['/patient-edit', id]);
  }

  borrarPaciente(id: number): void {
    if (confirm('¿Seguro que deseas borrar este paciente?')) {
      this.patientService.deleteById(id).subscribe({
        next: () => {
          this.snackBar.open('Paciente eliminado', 'Cerrar', { duration: 3000 });
          this.cargarPacientes();
        },
        error: () => {
          this.snackBar.open('Error al eliminar paciente', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
