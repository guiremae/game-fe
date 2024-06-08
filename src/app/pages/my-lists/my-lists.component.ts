import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import {
  FormBuilder,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/interfaces/list.interface';
import { AuthService } from 'src/app/services/auth.service';
import { IgdbService } from 'src/app/services/igdb.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrl: './my-lists.component.scss',
})
export class MyListsComponent {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private igdbService: IgdbService,
    private listService: ListService,
    private _snackBar: MatSnackBar,
    public modalService: ModalService,
    private authService: AuthService
  ) {}

  gamesForm!: UntypedFormGroup;
  changesHistory: any[] = [];
  deletedgames: any[] = [];
  public isAdding: boolean = false;
  public isEditing: boolean = false;
  originalData!: any[];
  selectedOption: any;
  public loadingGames: boolean = false;
  formGroup = new UntypedFormGroup({
    title: new UntypedFormControl('', Validators.required),
    id: new UntypedFormControl(''),
  });

  public listCollection: List[] = [];
  ratingColors: string[] = [];
  public delay: number = 0;
  public targetID!: string;
  public lastListSelection!: MatSelectionListChange;

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.listCollection = data['listCollection'].lists;
      this.gamesForm = this.formBuilder.group({
        games: this.formBuilder.array([]),
      });
    });
    const userAgent = navigator.userAgent.toLowerCase();
    this.delay = userAgent.includes('mobile') ? 500 : 0;
  }

  get gamesFormArray(): UntypedFormArray {
    return this.gamesForm.get('games') as UntypedFormArray;
  }

  addGame(gameData: {
    id: string;
    name: string;
    index: number;
    cover: any;
    rating: number;
  }) {
    const gameGroup = this.formBuilder.group({
      id: [gameData.id, Validators.required],
      name: [gameData.name, Validators.required],
      index: [gameData.index, Validators.required],
      cover: [gameData.cover?.url.replace('thumb', 'cover_big')],
      rating: [gameData.rating],
    });
    this.gamesFormArray.push(gameGroup);
    this.sortGamesByIndex();
  }

  private sortGamesByIndex() {
    // Ordenar los controles del formulario según el índice
    this.gamesFormArray.controls.sort((a, b) => {
      return a.get('index')!.value - b.get('index')!.value;
    });
  }

  removeGame(index: number) {
    const removedGame = this.gamesFormArray.at(index).value;
    this.deletedgames.push(removedGame);
    this.gamesFormArray.removeAt(index);
    this.gamesFormArray.markAsDirty();
  }

  drop(event: any) {
    moveItemInArray(
      this.gamesFormArray.controls,
      event.previousIndex,
      event.currentIndex
    );
    this.gamesFormArray.markAsDirty();
    this.gamesFormArray.controls.forEach((control, index) => {
      control.get('index')?.setValue(index);
    });
  }

  saveChanges() {
    const list = this.selectedOption;
    // Vaciar el array 'games'
    while (list.games.length > 0) {
      list.games.pop();
    }

    // Hacer push de los IDs del 'gamesFormArray'
    this.gamesFormArray.controls.forEach((control) => {
      list.games.push(control.value.id);
    });

    this.listService.updateList(list).subscribe((data) => {
      this.gamesFormArray.markAsPristine();
      this._snackBar.open('Lista actualizada con éxito', undefined, {
        duration: 1500,
        panelClass: ['app-notification-success', 'center'],
      });
    });
  }
  undoChanges() {
    this.gamesFormArray.setValue(this.originalData);
    this.gamesFormArray.markAsPristine();
  }

  onListSelection(ev: MatSelectionListChange) {
    this.lastListSelection = ev;
    this.gamesFormArray?.markAsPristine();
    while (this.gamesFormArray.length !== 0) {
      this.gamesFormArray.removeAt(0);
    }
    const listID = ev.source.selectedOptions.selected[0].value;
    this.listService.getListInfo(listID).subscribe((data) => {
      this.selectedOption = data;
      const games = this.selectedOption.games;
      if (games.length > 0) {
        games.forEach(() => {
          this.ratingColors.push('');
        });
        this.loadingGames = true;
        this.igdbService.getListGames(games).subscribe((data) => {
          data.forEach((game: any) => {
            const gameIndex = games.findIndex((id: string) => id === game.id);
            game.index = gameIndex;
            if (
              this.selectedOption.scores &&
              this.selectedOption.scores[game.id]
            ) {
              game.rating = this.selectedOption.scores[game.id];
            }
            this.addGame(game);
          });
          this.originalData = this.gamesFormArray.getRawValue();
          this.loadingGames = false;
        });
      }
    });
  }

  saveNewList() {
    if (this.formGroup.valid) {
      const title = this.formGroup.get('title')?.value;
      const user = localStorage.getItem('userID');
      this.listService.createList(title, `${user}`, [`${user}`], []).subscribe(
        (response) => {
          this.listService.getLists().subscribe((data) => {
            this.listCollection = data.lists;
            this.isAdding = false;
            this.formGroup.reset();
            this._snackBar.open('Lista creada con éxito', undefined, {
              duration: 1500,
              panelClass: ['app-notification-success', 'center'],
            });
          });
        },
        (error) => {
          // Manejar errores de autenticación
          console.error('Error durante el inicio de sesión:', error);
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  deleteList() {
    this.listService.deleteList(this.selectedOption.id).subscribe(() => {
      this.selectedOption = null;
      this.listService.getLists().subscribe((data) => {
        this.listCollection = data.lists;
        this._snackBar.open('Lista eliminada con éxito', undefined, {
          duration: 1500,
          panelClass: ['app-notification-success', 'center'],
        });
      });
    });
  }

  getColor(value: number): string {
    if (value >= 0 && value <= 4) {
      return 'red';
    }
    if (value >= 5 && value < 7) {
      return 'yellow';
    }
    if (value >= 7 && value < 9) {
      return 'green';
    }
    if (value >= 9 && value < 10) {
      return 'purple';
    }
    if (value == 10) {
      return '#C69749';
    }
    return 'transparent';
  }

  onEdit(list: List) {
    this.isEditing = true;
    this.formGroup.patchValue(list);
    list.isEditing = !list.isEditing;
  }

  public saveHandler(event: any) {
    event.stopPropagation();
    if (this.formGroup.valid) {
      const title = this.formGroup.get('title')?.value;
      const id = this.formGroup.get('id')?.value;
      const user = localStorage.getItem('userID');
      if (this.isAdding)
        this.listService
          .createList(title, `${user}`, [`${user}`], [])
          .subscribe(
            (response) => {
              this.listService.getLists().subscribe((data) => {
                this.listCollection = data.lists;
                this.isAdding = false;
                this.formGroup.reset();
                this._snackBar.open('Lista creada con éxito', undefined, {
                  duration: 1500,
                  panelClass: ['app-notification-success', 'center'],
                });
              });
            },
            (error) => {
              // Manejar errores de autenticación
              console.error('Error durante el inicio de sesión:', error);
            }
          );
      else {
        this.listService.editListTitle(title, id).subscribe(
          () => {
            this.listService.getLists().subscribe((data) => {
              this.listCollection = data.lists;
              this.isEditing = false;
              this.formGroup.reset();
              this._snackBar.open('Lista editada con éxito', undefined, {
                duration: 1500,
                panelClass: ['app-notification-success', 'center'],
              });
            });
          },
          (error) => {
            // Manejar errores de autenticación
            console.error('Error durante el inicio de sesión:', error);
          }
        );
      }
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  // Generar el enlace de la lista basado en el listID seleccionado
  generateListLink(): string {
    return `http://gamelog.hopto.org/list/${this.selectedOption.id}`;
  }

  getTargetID(listID: string) {
    this.targetID = listID;
  }

  moveBetweenList(event: CdkDragDrop<List[], any, any>): void {
    const originListID = this.selectedOption.id;
    const gameID = event.previousContainer.data[event.previousIndex];
    const destinationListID = this.targetID;
    if (originListID != destinationListID) {
      this.listService
        .moveGameBetweenLists(originListID, gameID, destinationListID)
        .subscribe(
          (data) => {
            this._snackBar.open('Juego movido con éxito', undefined, {
              duration: 1500,
              panelClass: ['app-notification-success', 'center'],
            });
            this.onListSelection(this.lastListSelection);
          },
          (error) => {
            this._snackBar.open(
              'No se ha podido mover el juego a la lista',
              undefined,
              {
                duration: 1500,
                panelClass: ['app-notification-error', 'center'],
              }
            );
          }
        );
    }
  }

  onEditRating(game: any) {
    const isLogged = this.authService.getLoggedInValue();
    if (isLogged) {
      this.modalService
        .openEditRatingModal(game)
        .subscribe((rating: number) => {
          if (rating) {
            this.onListSelection(this.lastListSelection);
          }
        });
    } else {
      this.modalService.openLoginModal();
    }
  }
}
