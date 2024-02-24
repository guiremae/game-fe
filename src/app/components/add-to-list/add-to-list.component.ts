// login.component.ts
import { Component, Inject, ViewChild } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.scss'],
})
export class AddToListComponent {
  listCollection = [
    { title: 'pizza', id: 1 },
    { title: 'burger', id: 2 },
    // ... otros alimentos
  ];
  foods = [
    { value: 'pizza', viewValue: 'Pizza' },
    { value: 'burger', viewValue: 'Burger' },
    // ... otros alimentos
  ];

  addForm = new UntypedFormGroup({
    list: new UntypedFormControl('', Validators.required),
    listname: new UntypedFormControl(''),
  });
  game: any;
  prevValues: any = [];

  constructor(
    public modalService: ModalService,
    public listService: ListService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.listCollection = this.data.listData.lists;
    this.game = this.data.game;
  }

  onListSelectionChange(ev: any) {
    const selectedOption = ev.value[ev.value.length - 1];
    const lastValue = this.prevValues;
    if (selectedOption == 'newList') {
      if (lastValue != 'newList') {
        this.addForm.get('list')?.setValue(['newList']);
      } else {
        this.addForm.get('list')?.setValue([ev.value[0]]);
      }
    }
    this.prevValues = selectedOption;
    console.log(ev.value);
    console.log(this.addForm.get('list')?.value);
  }

  onSubmit() {
    if (this.addForm.get('list')?.value != 'newList') {
      const listID = this.addForm.get('list')?.value.id;
      const gameID = this.game.id;
      this.listService.addGame(listID, gameID).subscribe(
        (response) => {
          // Manejar la respuesta del backend, que debería incluir el token de sesión
          this._snackBar.open('Lista con juego añadido con éxito', 'Vale', {
            duration: 1500,
          });
          // Cerrar la modal después de un inicio de sesión exitoso
          this.modalService.closeModal();
        },
        (error) => {
          // Manejar errores de autenticación
          console.error('Error durante el inicio de sesión:', error);
        }
      );
    } else {
      const title = this.addForm.get('listname')?.value;
      const user = localStorage.getItem('userID');
      this.listService
        .createList(title, `${user}`, [`${user}`], [this.game.id])
        .subscribe(
          (response) => {
            // Manejar la respuesta del backend, que debería incluir el token de sesión
            this._snackBar.open('Lista con juego añadido con éxito', 'Vale', {
              duration: 1500,
            });
            // Cerrar la modal después de un inicio de sesión exitoso
            this.modalService.closeModal();
          },
          (error) => {
            // Manejar errores de autenticación
            console.error('Error durante el inicio de sesión:', error);
          }
        );
    }
  }
}
