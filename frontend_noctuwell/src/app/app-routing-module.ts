import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './components/patients/patient-list/patient-list';
import { PatientAddEditComponent } from './components/patients/patient-add-edit/patient-add-edit';
import { PlanListComponent } from './components/plans/plan-list/plan-list';
import { PlanAddEditComponent } from './components/plans/plan-add-edit/plan-add-edit';
import { SpecialistListComponent } from './components/specialists/specialist-list/specialist-list';
import { SpecialistAddEditComponent } from './components/specialists/specialist-add-edit/specialist-add-edit';
import { TypeSpecialistListComponent } from './components/type-specialists/type-specialist-list/type-specialist-list';
import { TypeSpecialistAddEditComponent } from './components/type-specialists/type-specialist-add-edit/type-specialist-add-edit';
import { AppointmentListComponent } from './components/appointments/appointment-list/appointment-list';
import { AppointmentAddEditComponent } from './components/appointments/appointment-add-edit/appointment-add-edit';


const routes: Routes = [
  { path: 'patient-list', component: PatientListComponent },
  { path: 'patient-add', component: PatientAddEditComponent },
  { path: 'patient-edit/:id', component: PatientAddEditComponent },
  { path: 'plan-list', component: PlanListComponent },
  { path: 'plan-add', component: PlanAddEditComponent },
  { path: 'plan-edit/:id', component: PlanAddEditComponent },
  { path: 'specialist-list', component: SpecialistListComponent },
  { path: 'specialist-add', component: SpecialistAddEditComponent },
  { path: 'specialist-edit/:id', component: SpecialistAddEditComponent },
  { path: 'type-specialist-list', component: TypeSpecialistListComponent },
  { path: 'type-specialist-add', component: TypeSpecialistAddEditComponent },
  { path: 'type-specialist-edit/:id', component: TypeSpecialistAddEditComponent },
  { path: 'appointment-list', component: AppointmentListComponent },
  { path: 'appointment-add', component: AppointmentAddEditComponent },
  { path: 'appointment-edit/:id', component: AppointmentAddEditComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
