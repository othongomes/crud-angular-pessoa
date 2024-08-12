import { PersonsService } from './../services/persons.service';
import { Component } from '@angular/core';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import {PersonModel } from '../model/person-model';
import { catchError, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { CategoryPipe } from '../../shared/pipes/category.pipe';

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, ErrorDialogComponent, CategoryPipe], //Importado ErrorDialogComponent
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.scss'
})
export class PersonsComponent {

  personsData$: Observable<PersonModel[]>; // Identificamos como um Observable de personsModel
  //dataSource = ELEMENT_DATA;

  displayedColumns: string[] = ['_id', 'nome', 'nascimento', 'email', 'cpf'];

  //PersonsService: PersonsService;

  constructor(
    private PersonsService: PersonsService,
    public dialog: MatDialog) { //Adicionado MatDialog no construtor
    //this.PersonsService = new PersonsService;
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

}
