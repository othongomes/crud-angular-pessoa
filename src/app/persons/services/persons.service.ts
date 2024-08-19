import { Injectable } from '@angular/core';
import { PersonModel } from '../model/person-model';
import { HttpClient } from '@angular/common/http'
import { delay, first, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  private readonly API = '/api/pessoas';

  constructor(private httpCliente: HttpClient) { }

  list() {
    return this.httpCliente.get<PersonModel[]>(this.API)
    .pipe(
      first(),
      delay(2000),
      tap(persons => console.log(persons))
    );
  }

  save(record: PersonModel) {
    //console.log(record);
    return this.httpCliente.post<PersonModel>(this.API, record)
    .pipe(first());
  }
}
