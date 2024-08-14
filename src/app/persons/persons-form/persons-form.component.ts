import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { DateFormatModule } from '../../shared/date-format/date-format.module';
import { PersonsService } from '../services/persons.service';

@Component({
  selector: 'app-persons-form',
  standalone: true,
  imports: [ReactiveFormsModule, AppMaterialModule, DateFormatModule],
  templateUrl: './persons-form.component.html',
  styleUrl: './persons-form.component.scss'
})
export class PersonsFormComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
  private service: PersonsService, //2
  private snackBar: MatSnackBar //5
  ) {
    this.form = this.formBuilder.group({
      _id: [null],
      genero: [null],
      nome: [null],
      nascimento: [null],
      email: [null],
      cpf: [null],
    });
  }

  onSubmit() {
    //console.log(this.form.value); //1
    //this.service.save(this.form.value); //3
    this.service.save(this.form.value)
    .subscribe(result => console.log(result), //4
    error => this.snackError()); //5 //6
  }

  onCancel() {

  }

  snackError() { //6
    this.snackBar.open('Erro ao salvar usuário!','',{duration: 3000})
  }

}
