import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: '',
        loadChildren: () => import('./components/layout/layout.module').then(m => m.LayoutModule)
    }
];
