import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../../views/dashboard/dashboard.component';
import { EmployeeComponent } from '../../views/employee/employee.component';
import { AreaComponent } from '../../views/area/area.component';
import { JobComponent } from '../../views/job/job.component';
import { DepartmentComponent } from '../../views/department/department.component';
import { DiseaseComponent } from '../../views/disease/disease.component';
import { EmployeeDialogComponent } from '../../dialogs/employee-dialog/employee-dialog.component';
import { EmployeeDiseaseComponent } from '../../views/employee-disease/employee-disease.component';
import { EmergencyComponent } from '../../views/emergency/emergency.component';
import { TypeAbsenceComponent } from '../../views/type-absence/type-absence.component';
import { EmployeeReentryComponent } from '../../views/employee-reentry/employee-reentry.component';
import { EmployeeLeaveComponent } from '../../views/employee-leave/employee-leave.component';
import { ContractComponent } from '../../views/contract/contract.component';
import { AbsenceComponent } from '../../views/absence/absence.component';
import { AbsenceChartComponent } from '../../views/absence-chart/absence-chart.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'empleados',
                component: EmployeeComponent
            },
            {
                path: 'areas',
                component: AreaComponent
            },
            {
                path: 'trabajos',
                component: JobComponent
            },
            {
                path: 'departamentos',
                component: DepartmentComponent
            },
            {
                path: 'enfermedades',
                component: DiseaseComponent
            },
            {
                path: 'tipos-de-faltas',
                component: TypeAbsenceComponent
            },
            {
                path: 'empleadosenfermedades',
                component: EmployeeDiseaseComponent
            },
            {
                path: 'emergencias',
                component: EmergencyComponent
            },
            {
                path: 'reingresos',
                component: EmployeeReentryComponent
            },
            {
                path: 'bajas',
                component: EmployeeLeaveComponent
            },
            {
                path: 'contratos',
                component: ContractComponent
            },
            {
                path: 'faltas',
                component: AbsenceComponent
            },
            {
                path: 'faltas-estadistica',
                component: AbsenceChartComponent
            },
        ]
    }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ]
})
export class LayoutModule { }
