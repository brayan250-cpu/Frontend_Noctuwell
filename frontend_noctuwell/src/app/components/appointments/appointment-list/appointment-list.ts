import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment-service';
import { Appointment } from '../../../models/appointment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.css']
})
export class AppointmentListComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 'patientId', 'specialistId', 'scheduleId', 'date', 'status', 'acciones'
  ];

  dsAppointments = new MatTableDataSource<Appointment>();

  constructor(
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.appointmentService.getAll().subscribe({
      next: (data) => this.dsAppointments.data = data,
      error: () => this.snackBar.open("Error al cargar citas", "Cerrar", { duration: 3000 })
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsAppointments.filter = filterValue.trim().toLowerCase();
  }

  nuevaCita(): void {
    this.router.navigate(['/appointment-add']);
  }

  editarCita(id: number): void {
    this.router.navigate(['/appointment-edit', id]);
  }

  borrarCita(id: number): void {
    if (confirm("¿Seguro que deseas borrar esta cita?")) {
      this.appointmentService.deleteById(id).subscribe({
        next: () => {
          this.snackBar.open("Cita eliminada", "Cerrar", { duration: 3000 });
          this.cargarCitas();
        },
        error: () => this.snackBar.open("Error al eliminar cita", "Cerrar", { duration: 3000 })
      });
    }
  }
}
