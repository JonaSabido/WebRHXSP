import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: '',
        loadChildren: () => import('./components/layout/layout.module').then(m => m.LayoutModule)
    },
    {
        path: '**',
        component: LoginComponent
    }
];
