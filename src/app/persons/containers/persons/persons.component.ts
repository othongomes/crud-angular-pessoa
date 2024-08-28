import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { PersonsListComponent } from '../../components/persons-list/persons-list.component';
import { PersonModel } from '../../model/person-model';
import { PersonsService } from '../../services/persons.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, ErrorDialogComponent, CategoryPipe, PersonsListComponent], //Importado ErrorDialogComponent
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.scss'
})
export class PersonsComponent {

  personsData$: Observable<PersonModel[]> | null = null; // Identificamos como um Observable de personsModel
  //dataSource = ELEMENT_DATA;

  //displayedColumns: string[] = ['_id', 'genero', 'nome', 'nascimento', 'email', 'cpf', 'actions'];

  //PersonsService: PersonsService;

  constructor(
    private PersonsService: PersonsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    //this.PersonsService = new PersonsService;
    // this.personsData$ = this.PersonsService.list()
    // .pipe(
    //   catchError(error => {
    //     this.openDialog('Erro ao buscar dados!') // Retirado console.log para passarmos a mensagem
    //     return of([])  //Espera o retorno de um Observable
    //   })
    // );
    this.refresh();
  }

  refresh() {
    this.personsData$ = this.PersonsService.list()
    .pipe(
      catchError(error => {
        this.openDialog('Erro ao buscar dados!') // Retirado console.log para passarmos a mensagem
        return of([])  //Espera o retorno de um Observable
      })
    );
  }

  openDialog(errorMsg: string) { //Acrescentando a função openDialog
    this.dialog.open(ErrorDialogComponent, { // Adicionado o ErrorDialogComponent
      data: errorMsg // data em vez de ser um objeto será a mensagem de erro
    });
  }

  goToForm() {
    this.router.navigate(['/newUser'], {relativeTo: this.route});
  }

  goToFormEdit(person: PersonModel) {
    this.router.navigate(['/edit', person._id], {relativeTo: this.route});
  }

  onRemove(person: PersonModel) {

    //Dialog para confirmar se deseja deletar
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover o usuário?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      //logica se veradeiro vai remover
      if (result) {
        this.PersonsService.remove(person._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Usuário removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            })
          },
          () => this.openDialog('Erro ao tentar remover usuário.')
        )
      }
    });
    //fim dialog



  }

}
