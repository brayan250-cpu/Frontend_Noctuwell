import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppointmentService } from '../../../services/appointment-service';
import { PatientService } from '../../../services/patient-service';
import { SpecialistService } from '../../../services/specialist-service';
import { ScheduleService } from '../../../services/schedule-service';
import { Appointment } from '../../../models/appointment';
import { Patient } from '../../../models/patient';
import { Specialist } from '../../../models/specialist';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-appointment-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './appointment-add-edit.html',
  styleUrls: ['./appointment-add-edit.css']
})
export class AppointmentAddEditComponent implements OnInit {

  form!: FormGroup;
  idAppointment: number | null = null;
  titulo: string = "Nueva Cita";

  patients: Patient[] = [];
  specialists: Specialist[] = [];
  schedules: any[] = [];
  readonly statusOptions: string[] = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private specialistService: SpecialistService,
    private scheduleService: ScheduleService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      patientId: [null, Validators.required],
      specialistId: [null, Validators.required],
      scheduleId: [null, Validators.required],
      date: ['', Validators.required],
      status: ['PENDING', Validators.required]
    });

    this.patientService.getAll().subscribe(data => this.patients = data);
    this.specialistService.getAll().subscribe(data => this.specialists = data);

    this.form.get('specialistId')?.valueChanges.subscribe(id => {
      this.schedules = [];
      this.form.get('scheduleId')?.reset();
      if (id) {
        this.scheduleService.getBySpecialistId(id).subscribe({
          next: (data) => this.schedules = data,
          error: () => this.snackBar.open("Error al cargar horarios", "Cerrar", { duration: 3000 })
        });
      }
    });

    this.route.params.subscribe(p => {
      if (p['id']) {
        this.idAppointment = +p['id'];
        this.titulo = "Editar Cita";
        this.cargarCita(this.idAppointment);
      }
    });
  }

  cargarCita(id: number): void {
    this.appointmentService.getById(id).subscribe({
      next: (data) => {
        this.form.patchValue(data);

        this.scheduleService.getBySpecialistId(data.specialistId).subscribe(
          schedules => this.schedules = schedules
        );
      },
      error: () => this.snackBar.open("Error al cargar cita", "Cerrar", { duration: 3000 })
    });
  }

  grabar(): void {
    if (this.form.invalid) {
      this.snackBar.open("Completa los campos obligatorios", "Cerrar", { duration: 3000 });
      return;
    }

    const cita: Appointment = this.form.value;

    if (this.idAppointment) {
      cita.id = this.idAppointment;
      this.appointmentService.edit(cita).subscribe({
        next: () => {
          this.snackBar.open("Cita actualizada", "Cerrar", { duration: 3000 });
          this.router.navigate(['/appointment-list']);
        },
        error: () => this.snackBar.open("Error al actualizar cita", "Cerrar", { duration: 3000 })
      });
    } else {
      this.appointmentService.new(cita).subscribe({
        next: () => {
          this.snackBar.open("Cita creada", "Cerrar", { duration: 3000 });
          this.router.navigate(['/appointment-list']);
        },
        error: () => this.snackBar.open("Error al crear cita", "Cerrar", { duration: 3000 })
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/appointment-list']);
  }

  getScheduleLabel(schedule: any): string {
    if (!schedule) {
      return '';
    }
    const parts = [
      schedule.dayOfWeek || schedule.day,
      schedule.startTime && schedule.endTime
        ? `${schedule.startTime} - ${schedule.endTime}`
        : schedule.startTime || schedule.hour
    ].filter(Boolean);
    return parts.length ? parts.join(' · ') : `Horario #${schedule.id}`;
  }
}
