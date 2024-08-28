import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { personResolverResolver } from './person-resolver.resolver';
import { Observable } from 'rxjs';
import { PersonModel } from '../model/person-model';


describe('personResolverResolver', () => {
  const executeResolver: ResolveFn<Observable<PersonModel>> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => personResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
