import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../services/patient-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from '../../../models/patient';

@Component({
  selector: 'app-patient-add-edit',
  templateUrl: './patient-add-edit.html',
  styleUrls: ['./patient-add-edit.css']
})
export class PatientAddEditComponent implements OnInit {

  form!: FormGroup;
  idPaciente: number | null = null;
  titulo: string = 'Nuevo Paciente';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      birthdate: ['']
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idPaciente = +params['id'];
        this.titulo = 'Editar Paciente';
        this.cargarPaciente(this.idPaciente);
      }
    });
  }

  cargarPaciente(id: number): void {
    this.patientService.getById(id).subscribe({
      next: data => {
        this.form.patchValue(data);
      },
      error: () => {
        this.snackBar.open('Error al cargar datos del paciente', 'Cerrar', { duration: 3000 });
      }
    });
  }

  grabar(): void {
    if (this.form.invalid) {
      this.snackBar.open('Completa los campos obligatorios', 'Cerrar', { duration: 3000 });
      return;
    }

    const patient: Patient = this.form.value;

    if (this.idPaciente) {
      // modo editar
      patient.id = this.idPaciente;
      this.patientService.edit(patient).subscribe({
        next: () => {
          this.snackBar.open('Paciente actualizado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/patient-list']);
        },
        error: () => {
          this.snackBar.open('Error al actualizar paciente', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      // modo nuevo
      this.patientService.new(patient).subscribe({
        next: () => {
          this.snackBar.open('Paciente creado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/patient-list']);
        },
        error: () => {
          this.snackBar.open('Error al crear paciente', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/patient-list']);
  }
}
