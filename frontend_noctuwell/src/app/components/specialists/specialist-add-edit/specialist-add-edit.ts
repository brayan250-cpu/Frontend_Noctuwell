import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SpecialistService } from '../../../services/specialist-service';
import { TypeSpecialistService } from '../../../services/type-specialist-service';

import { Specialist } from '../../../models/specialist';
import { TypeSpecialist } from '../../../models/type-specialist';

@Component({
  selector: 'app-specialist-add-edit',
  templateUrl: './specialist-add-edit.html',
  styleUrls: ['./specialist-add-edit.css']
})
export class SpecialistAddEditComponent implements OnInit {

  form!: FormGroup;
  idSpecialist: number | null = null;
  titulo: string = 'Nuevo Especialista';

  typeSpecialists: TypeSpecialist[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private specialistService: SpecialistService,
    private typeSpecialistService: TypeSpecialistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      typeSpecialistId: [null, Validators.required]
    });

    // cargar tipos de especialista para el combo
    this.typeSpecialistService.getAll().subscribe({
      next: data => this.typeSpecialists = data,
      error: () => this.snackBar.open('Error al cargar tipos de especialista', 'Cerrar', { duration: 3000 })
    });

    // si viene id en la ruta, es modo editar
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idSpecialist = +params['id'];
        this.titulo = 'Editar Especialista';
        this.cargarSpecialist(this.idSpecialist);
      }
    });
  }

  cargarSpecialist(id: number): void {
    this.specialistService.getById(id).subscribe({
      next: data => this.form.patchValue(data),
      error: () => this.snackBar.open('Error al cargar datos del especialista', 'Cerrar', { duration: 3000 })
    });
  }

  grabar(): void {
    if (this.form.invalid) {
      this.snackBar.open('Completa los campos obligatorios', 'Cerrar', { duration: 3000 });
      return;
    }

    const specialist: Specialist = this.form.value;

    if (this.idSpecialist) {
      specialist.id = this.idSpecialist;
      this.specialistService.edit(specialist).subscribe({
        next: () => {
          this.snackBar.open('Especialista actualizado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/specialist-list']);
        },
        error: () => this.snackBar.open('Error al actualizar especialista', 'Cerrar', { duration: 3000 })
      });
    } else {
      this.specialistService.new(specialist).subscribe({
        next: () => {
          this.snackBar.open('Especialista creado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/specialist-list']);
        },
        error: () => this.snackBar.open('Error al crear especialista', 'Cerrar', { duration: 3000 })
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/specialist-list']);
  }
}
