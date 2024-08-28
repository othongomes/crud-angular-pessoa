import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { PersonModel } from '../../model/person-model';

@Component({
  selector: 'app-persons-list',
  standalone: true,
  imports: [AppMaterialModule, CategoryPipe],
  templateUrl: './persons-list.component.html',
  styleUrl: './persons-list.component.scss'
})
export class PersonsListComponent {

  //COMPONENTE BURRO
  @Input() persons: PersonModel[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns: string[] = ['_id', 'genero', 'nome', 'nascimento', 'email', 'cpf', 'actions'];

  constructor() {

  }

  goToForm() {
    this.add.emit(true);
  }

  goToFormEdit(person: PersonModel) {
    this.edit.emit(person);
  }

  onDelete(person: PersonModel) {
    this.remove.emit(person);
  }

}
