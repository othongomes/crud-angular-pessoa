import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { DateFormatModule } from '../../shared/date-format/date-format.module';
import { PersonsService } from '../services/persons.service';
import { PersonsListComponent } from "../persons-list/persons-list.component";

@Component({
  selector: 'app-persons-form',
  standalone: true,
  imports: [ReactiveFormsModule, AppMaterialModule, DateFormatModule, PersonsListComponent],
  templateUrl: './persons-form.component.html',
  styleUrl: './persons-form.component.scss',
})
export class PersonsFormComponent {

  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: PersonsService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      _id: [''],
      genero: [''],
      nome: [''],
      nascimento: [''],
      email: [''],
      cpf: [''],
    });
  }

  onSubmit() {
    //console.log(this.form.value);
    //this.service.save(this.form.value);
    if (this.form.value){
      this.form.value.nascimento = moment(this.form.value.nascimento).format('YYYY-MM-DD');
    }
    this.service.save(this.form.value).subscribe(
      (result) => this.snackSuccess(),
      (error) => this.snackError()
    );
  }

  onCancel() {
    this.location.back();
  }

  snackError() {
    this.snackBar.open('Erro ao salvar usuário!', '', { duration: 3000 });
  }

  snackSuccess() {
    this.snackBar.open('Usuário salvo com sucesso!', '', { duration: 3000 });
    this.onCancel();
  }
}
