import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TypeSpecialistService } from '../../../services/type-specialist-service';
import { TypeSpecialist } from '../../../models/type-specialist';

@Component({
  selector: 'app-type-specialist-list',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './type-specialist-list.html',
  styleUrls: ['./type-specialist-list.css']
})
export class TypeSpecialistListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'acciones'];
  dsTypeSpecialists = new MatTableDataSource<TypeSpecialist>();

  constructor(
    private typeSpecialistService: TypeSpecialistService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTypeSpecialists();
  }

  cargarTypeSpecialists(): void {
    this.typeSpecialistService.getAll().subscribe({
      next: data => this.dsTypeSpecialists.data = data,
      error: () => this.snackBar.open('Error al cargar tipos de especialista', 'Cerrar', {
        duration: 3000
      })
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsTypeSpecialists.filter = filterValue.trim().toLowerCase();
  }

  nuevoTypeSpecialist(): void {
    this.router.navigate(['/type-specialist-add']);
  }

  editarTypeSpecialist(id: number): void {
    this.router.navigate(['/type-specialist-edit', id]);
  }

  borrarTypeSpecialist(id: number): void {
    if (confirm('¿Seguro que deseas borrar este tipo de especialista?')) {
      this.typeSpecialistService.deleteById(id).subscribe({
        next: () => {
          this.snackBar.open('Tipo de especialista eliminado', 'Cerrar', { duration: 3000 });
          this.cargarTypeSpecialists();
        },
        error: () => this.snackBar.open('Error al eliminar tipo de especialista', 'Cerrar', {
          duration: 3000
        })
      });
    }
  }
}
