import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { DateFormatModule } from '../../../shared/date-format/date-format.module';
import { PersonsListComponent } from '../../components/persons-list/persons-list.component';
import { PersonModel } from '../../model/person-model';
import { PersonsService } from '../../services/persons.service';

@Component({
  selector: 'app-persons-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppMaterialModule,
    DateFormatModule,
    PersonsListComponent,
  ],
  templateUrl: './persons-form.component.html',
  styleUrl: './persons-form.component.scss',
})
export class PersonsFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: PersonsService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      _id: [''],

      genero: ['', Validators.required],

      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],

      nascimento: [''],

      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],

      cpf: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],

      status: ['']
    });

    const person: PersonModel = this.route.snapshot.data['person'];
    // this.form.setValue({
    //   _id: person._id,
    //   genero: person.genero,
    //   nome: person.nome,
    //   nascimento: person.nascimento,
    //   email: person.email,
    //   cpf: person.cpf
    // })
    this.form.patchValue(person);
  }

  onSubmit() {
    //console.log(this.form.value);
    //this.service.save(this.form.value);
    if (this.form.value) {
      this.form.value.nascimento = moment(this.form.value.nascimento).format(
        'YYYY-MM-DD'
      );
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

  errorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório.';
    }

    if (field?.hasError('minlength')) {
      const requireLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 3;
      return `Tamanho mínimo de ${requireLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requireLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;
      return `Tamanho máximo de ${requireLength} caracteres excedido.`;
    }

    if (field?.hasError('email')) {
      return `E-mail inválido.`;
    }

    return 'Campo Inválido.';
  }

}
