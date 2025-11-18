import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PlanService } from '../../../services/plan-service';
import { Plan } from '../../../models/plan';

@Component({
  selector: 'app-plan-list',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './plan-list.html',
  styleUrls: ['./plan-list.css']
})
export class PlanListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'duration', 'acciones'];
  dsPlans = new MatTableDataSource<Plan>();

  constructor(
    private planService: PlanService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPlanes();
  }

  cargarPlanes(): void {
    this.planService.getAll().subscribe({
      next: data => this.dsPlans.data = data,
      error: () => this.snackBar.open('Error al cargar planes', 'Cerrar', { duration: 3000 })
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsPlans.filter = filterValue.trim().toLowerCase();
  }

  nuevoPlan(): void {
    this.router.navigate(['/plan-add']);
  }

  editarPlan(id: number): void {
    this.router.navigate(['/plan-edit', id]);
  }

  borrarPlan(id: number): void {
    if (confirm('¿Seguro que deseas borrar este plan?')) {
      this.planService.deleteById(id).subscribe({
        next: () => {
          this.snackBar.open('Plan eliminado', 'Cerrar', { duration: 3000 });
          this.cargarPlanes();
        },
        error: () => this.snackBar.open('Error al eliminar plan', 'Cerrar', { duration: 3000 })
      });
    }
  }
}
