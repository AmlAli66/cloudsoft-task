import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VacanciesComponent } from './pages/vacancies/vacancies.component';
import { SeafarersComponent } from './pages/seafarers/seafarers.component';
import { VesselsComponent } from './pages/vessels/vessels.component';
import { PreJoiningComponent } from './pages/pre-joining/pre-joining.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { PayrollComponent } from './pages/payroll/payroll.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingComponent } from './pages/setting/setting.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent,canActivate: [authGuard] },
    { path: 'vacancies', component: VacanciesComponent,canActivate: [authGuard] },
    { path: 'seafarers', component: SeafarersComponent,canActivate: [authGuard] },
    { path: 'vessels', component: VesselsComponent ,canActivate: [authGuard]},
    { path: 'pre-joining', component: PreJoiningComponent ,canActivate: [authGuard]},
    { path: 'planning', component: PlanningComponent ,canActivate: [authGuard]},
    { path: 'payroll', component: PayrollComponent ,canActivate: [authGuard]},
    { path: 'reports', component: ReportsComponent ,canActivate: [authGuard]},
    { path: 'setting', component: SettingComponent ,canActivate: [authGuard] },
];
