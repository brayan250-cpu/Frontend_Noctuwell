import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'patient-list',
    loadComponent: () =>
      import('./components/patients/patient-list/patient-list').then(m => m.PatientListComponent)
  },
  {
    path: 'patient-add',
    loadComponent: () =>
      import('./components/patients/patient-add-edit/patient-add-edit').then(m => m.PatientAddEditComponent)
  },
  {
    path: 'patient-edit/:id',
    loadComponent: () =>
      import('./components/patients/patient-add-edit/patient-add-edit').then(m => m.PatientAddEditComponent)
  },
  {
    path: 'specialist-list',
    loadComponent: () =>
      import('./components/specialists/specialist-list/specialist-list').then(m => m.SpecialistListComponent)
  },
  {
    path: 'specialist-add',
    loadComponent: () =>
      import('./components/specialists/specialist-add-edit/specialist-add-edit').then(m => m.SpecialistAddEditComponent)
  },
  {
    path: 'specialist-edit/:id',
    loadComponent: () =>
      import('./components/specialists/specialist-add-edit/specialist-add-edit').then(m => m.SpecialistAddEditComponent)
  },
  {
    path: 'plan-list',
    loadComponent: () =>
      import('./components/plans/plan-list/plan-list').then(m => m.PlanListComponent)
  },
  {
    path: 'plan-add',
    loadComponent: () =>
      import('./components/plans/plan-add-edit/plan-add-edit').then(m => m.PlanAddEditComponent)
  },
  {
    path: 'plan-edit/:id',
    loadComponent: () =>
      import('./components/plans/plan-add-edit/plan-add-edit').then(m => m.PlanAddEditComponent)
  },
  {
    path: 'type-specialist-list',
    loadComponent: () =>
      import('./components/type-specialists/type-specialist-list/type-specialist-list').then(
        m => m.TypeSpecialistListComponent
      )
  },
  {
    path: 'type-specialist-add',
    loadComponent: () =>
      import('./components/type-specialists/type-specialist-add-edit/type-specialist-add-edit').then(
        m => m.TypeSpecialistAddEditComponent
      )
  },
  {
    path: 'type-specialist-edit/:id',
    loadComponent: () =>
      import('./components/type-specialists/type-specialist-add-edit/type-specialist-add-edit').then(
        m => m.TypeSpecialistAddEditComponent
      )
  },
  {
    path: 'appointment-list',
    loadComponent: () =>
      import('./components/appointments/appointment-list/appointment-list').then(
        m => m.AppointmentListComponent
      )
  },
  {
    path: 'appointment-add',
    loadComponent: () =>
      import('./components/appointments/appointment-add-edit/appointment-add-edit').then(
        m => m.AppointmentAddEditComponent
      )
  },
  {
    path: 'appointment-edit/:id',
    loadComponent: () =>
      import('./components/appointments/appointment-add-edit/appointment-add-edit').then(
        m => m.AppointmentAddEditComponent
      )
  },
  { path: '**', redirectTo: '' }
];
