import { Routes } from '@angular/router';

import { PersonsFormComponent } from './persons/containers/persons-form/persons-form.component';
import { personResolverResolver } from './persons/guardsRouter/person-resolver.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'persons',
  },
  {
    path: 'persons',
    loadComponent: () => import('./persons/containers/persons/persons.component').then(c => c.PersonsComponent)
  },
  {
    path: 'newUser',
    component: PersonsFormComponent,
    resolve: {person: personResolverResolver}
  },
  {
    path: 'edit/:id',
    component: PersonsFormComponent,
    resolve: {person: personResolverResolver}
  }
];
