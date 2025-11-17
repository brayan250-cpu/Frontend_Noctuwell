import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from '../../../services/plan-service';
import { Plan } from '../../../models/plan';

@Component({
  selector: 'app-plan-add-edit',
  templateUrl: './plan-add-edit.html',
  styleUrls: ['./plan-add-edit.css']
})
export class PlanAddEditComponent implements OnInit {

  form!: FormGroup;
  idPlan: number | null = null;
  titulo: string = 'Nuevo Plan';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private planService: PlanService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      duration: [0, [Validators.required, Validators.min(1)]]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idPlan = +params['id'];
        this.titulo = 'Editar Plan';
        this.cargarPlan(this.idPlan);
      }
    });
  }

  cargarPlan(id: number): void {
    this.planService.getById(id).subscribe({
      next: data => this.form.patchValue(data),
      error: () => this.snackBar.open('Error al cargar datos del plan', 'Cerrar', { duration: 3000 })
    });
  }

  grabar(): void {
    if (this.form.invalid) {
      this.snackBar.open('Completa los campos obligatorios', 'Cerrar', { duration: 3000 });
      return;
    }

    const plan: Plan = this.form.value;

    if (this.idPlan) {
      plan.id = this.idPlan;
      this.planService.edit(plan).subscribe({
        next: () => {
          this.snackBar.open('Plan actualizado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/plan-list']);
        },
        error: () => this.snackBar.open('Error al actualizar plan', 'Cerrar', { duration: 3000 })
      });
    } else {
      this.planService.new(plan).subscribe({
        next: () => {
          this.snackBar.open('Plan creado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/plan-list']);
        },
        error: () => this.snackBar.open('Error al crear plan', 'Cerrar', { duration: 3000 })
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/plan-list']);
  }
}
