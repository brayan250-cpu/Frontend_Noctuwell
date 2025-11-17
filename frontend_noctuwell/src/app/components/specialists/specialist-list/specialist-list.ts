import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SpecialistService } from '../../../services/specialist-service';
import { Specialist } from '../../../models/specialist';

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.html',
  styleUrls: ['./specialist-list.css']
})
export class SpecialistListComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 'firstName', 'lastName', 'email', 'phone', 'typeSpecialistName', 'acciones'
  ];
  dsSpecialists = new MatTableDataSource<Specialist>();

  constructor(
    private specialistService: SpecialistService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarSpecialists();
  }

  cargarSpecialists(): void {
    this.specialistService.getAll().subscribe({
      next: data => this.dsSpecialists.data = data,
      error: () => this.snackBar.open('Error al cargar especialistas', 'Cerrar', { duration: 3000 })
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsSpecialists.filter = filterValue.trim().toLowerCase();
  }

  nuevoSpecialist(): void {
    this.router.navigate(['/specialist-add']);
  }

  editarSpecialist(id: number): void {
    this.router.navigate(['/specialist-edit', id]);
  }

  borrarSpecialist(id: number): void {
    if (confirm('¿Seguro que deseas borrar este especialista?')) {
      this.specialistService.deleteById(id).subscribe({
        next: () => {
          this.snackBar.open('Especialista eliminado', 'Cerrar', { duration: 3000 });
          this.cargarSpecialists();
        },
        error: () => this.snackBar.open('Error al eliminar especialista', 'Cerrar', { duration: 3000 })
      });
    }
  }
}
