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
import { EmployeeVacationComponent } from '../../views/employee-vacation/employee-vacation.component';
import { RecommendationComponent } from '../../views/recommendation/recommendation.component';
import { RecommendationPaymentComponent } from '../../views/recommendation-payment/recommendation-payment.component';
import { EmployeeVacationChartComponent } from '../../views/employee-vacation-chart/employee-vacation-chart.component';
import { AuthGuard } from '../../helpers/guards/auth-guard';
import { AntidopingComponent } from '../../views/antidoping/antidoping.component';
import { TrainingComponent } from '../../views/training/training.component';
import { ExtraTimeComponent } from '../../views/extra-time/extra-time.component';
import { RecruitmentMethodComponent } from '../../views/recruitment-method/recruitment-method.component';
import { UniformComponent } from '../../views/uniform/uniform.component';
import { UserComponent } from '../../views/user/user.component';
import { TypeLeaveComponent } from '../../views/type-leave/type-leave.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
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
                path: 'puestos',
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
                path: 'tipos-de-bajas',
                component: TypeLeaveComponent
            },
            {
                path: 'metodos-de-reclutamiento',
                component: RecruitmentMethodComponent
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
                path: 'uniformes',
                component: UniformComponent
            },
            {
                path: 'antidopings',
                component: AntidopingComponent
            },
            {
                path: 'capacitaciones',
                component: TrainingComponent
            },
            {
                path: 'tiempos-extra',
                component: ExtraTimeComponent
            },
            {
                path: 'faltas',
                component: AbsenceComponent
            },
            {
                path: 'faltas-estadistica',
                component: AbsenceChartComponent
            },
            {
                path: 'vacaciones',
                component: EmployeeVacationComponent
            },
            {
                path: 'vacaciones-estadistica',
                component: EmployeeVacationChartComponent
            },
            {
                path: 'recomendaciones',
                component: RecommendationComponent
            },
            {
                path: 'recomendaciones-pagos',
                component: RecommendationPaymentComponent
            },
            {
                path: 'usuarios',
                component: UserComponent
            }

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
