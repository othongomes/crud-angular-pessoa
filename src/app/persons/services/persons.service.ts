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
      //delay(1000),
      tap(persons => console.log(persons))
    );
  }

  loadById(id: Number) {
    return this.httpCliente.get<PersonModel>(`${this.API}/${id}`);
  }

  save(record: Partial<PersonModel>) {
    //console.log(record);
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<PersonModel>) {
    return this.httpCliente.post<PersonModel>(this.API, record)
    .pipe(first());
  }

  private update(record: Partial<PersonModel>) {
    return this.httpCliente.put<PersonModel>(`${this.API}/${record._id}`, record)
    .pipe(first());
  }

  remove(id: Number) {
    return this.httpCliente.delete(`${this.API}/${id}`)
    .pipe(first());
  }

}
