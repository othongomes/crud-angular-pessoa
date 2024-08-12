import { Routes } from '@angular/router';
import { PersonsComponent } from './persons/persons/persons.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'persons',
  },
  {
    path: 'persons',
    loadComponent: () => import('./persons/persons/persons.component').then(c => c.PersonsComponent)
  }
];
