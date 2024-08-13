import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { DateFormatModule } from '../../shared/date-format/date-format.module';

@Component({
  selector: 'app-persons-form',
  standalone: true,
  imports: [ReactiveFormsModule, AppMaterialModule, DateFormatModule], //1
  templateUrl: './persons-form.component.html',
  styleUrl: './persons-form.component.scss'
})
export class PersonsFormComponent {

  form: FormGroup; //2

  constructor(private formBuilder: FormBuilder) { //1
    this.form = this.formBuilder.group({ //3
      _id: [null],
      genero: [null],
      nome: [null],
      nascimento: [null],
      email: [null],
      cpf: [null],
    });
  }

}
