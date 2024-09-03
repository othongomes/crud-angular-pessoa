import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import { PersonModel } from '../model/person-model';
import { PersonsService } from './../services/persons.service';

export const personResolverResolver: ResolveFn<Observable<PersonModel>> = (route, state, service: PersonsService = inject(PersonsService)) => {


  if (route.params?.['id']){
    return service.loadById(route.params['id']);
  }
  return of({
    _id: 0,  // Use um valor numérico padrão para _id
    genero: '',
    nome: '',
    nascimento: new Date,  // Use um novo objeto Date ou outra data válida
    email: '',
    cpf: '',
    phones: []
  });
}
