import { Component, Input } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { PersonModel } from '../model/person-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryPipe } from '../../shared/pipes/category.pipe';

@Component({
  selector: 'app-persons-list',
  standalone: true,
  imports: [AppMaterialModule, CategoryPipe],
  templateUrl: './persons-list.component.html',
  styleUrl: './persons-list.component.scss'
})
export class PersonsListComponent {

  @Input() persons: PersonModel[] = [];

  readonly displayedColumns: string[] = ['_id', 'genero', 'nome', 'nascimento', 'email', 'cpf', 'actions'];

  constructor(private router: Router,
    private route: ActivatedRoute) {

  }

  goToForm() {
    this.router.navigate(['/newUser'], {relativeTo: this.route});
  }

}
