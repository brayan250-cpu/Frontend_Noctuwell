import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TypeSpecialistService } from '../../../services/type-specialist-service';
import { TypeSpecialist } from '../../../models/type-specialist';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-type-specialist-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './type-specialist-add-edit.html',
  styleUrls: ['./type-specialist-add-edit.css']
})
export class TypeSpecialistAddEditComponent implements OnInit {

  form!: FormGroup;
  idTypeSpecialist: number | null = null;
  titulo: string = 'Nuevo Tipo de Especialista';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private typeSpecialistService: TypeSpecialistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idTypeSpecialist = +params['id'];
        this.titulo = 'Editar Tipo de Especialista';
        this.cargarTypeSpecialist(this.idTypeSpecialist);
      }
    });
  }

  cargarTypeSpecialist(id: number): void {
    this.typeSpecialistService.getById(id).subscribe({
      next: data => this.form.patchValue(data),
      error: () => this.snackBar.open('Error al cargar datos del tipo de especialista', 'Cerrar', {
        duration: 3000
      })
    });
  }

  grabar(): void {
    if (this.form.invalid) {
      this.snackBar.open('Completa los campos obligatorios', 'Cerrar', { duration: 3000 });
      return;
    }

    const typeSpecialist: TypeSpecialist = this.form.value;

    if (this.idTypeSpecialist) {
      typeSpecialist.id = this.idTypeSpecialist;
      this.typeSpecialistService.edit(typeSpecialist).subscribe({
        next: () => {
          this.snackBar.open('Tipo de especialista actualizado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/type-specialist-list']);
        },
        error: () => this.snackBar.open('Error al actualizar tipo de especialista', 'Cerrar', {
          duration: 3000
        })
      });
    } else {
      this.typeSpecialistService.new(typeSpecialist).subscribe({
        next: () => {
          this.snackBar.open('Tipo de especialista creado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/type-specialist-list']);
        },
        error: () => this.snackBar.open('Error al crear tipo de especialista', 'Cerrar', {
          duration: 3000
        })
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/type-specialist-list']);
  }
}

