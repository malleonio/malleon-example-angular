import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // Home page renders in router-outlet
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'lazy',
    loadChildren: () => import('./lazy-feature/routes').then(m => m.routes)
  }
];

