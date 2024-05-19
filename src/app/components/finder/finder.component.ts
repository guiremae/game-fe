import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';
import { IgdbService } from 'src/app/services/igdb.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss'],
})
export class FinderComponent implements OnInit {
  searchForm = new UntypedFormGroup({
    gameName: new UntypedFormControl('', Validators.required),
  });

  @Output() textSearched = new EventEmitter<string>();
  @Output() gameAddedSuccessfully = new EventEmitter<void>();
  @Input() mode: string = 'search ';
  @Input() selectedList: string = '';

  public searchingInput: string = '';
  public suggestions$!: Observable<any[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private router: Router,
    private igdbService: IgdbService,
    private listService: ListService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.suggestions$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
        term ? this.igdbService.findSuggestedGames(term) : of([])
      )
    );
  }

  onSubmit() {
    if (this.mode === 'search') {
      const formData = this.searchForm.value;
      const searchMenuButton = document.querySelector(
        '.search-menu-button'
      ) as HTMLElement;
      searchMenuButton.click();
      this.searchForm.reset();
      this.searchTerms.next('');
      this.router.navigate([`/search/${formData.gameName}`]);
    }
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  selectSuggestion(suggestion: any): void {
    if (this.mode === 'search') {
      this.searchForm.reset();
      this.searchTerms.next('');
      const searchMenuButton = document.querySelector(
        '.search-menu-button'
      ) as HTMLElement;
      searchMenuButton.click();
      this.router.navigate([`/game/${suggestion.id}`]);
    }
    if (this.mode === 'add') {
      this.listService.addGame(this.selectedList, suggestion.id).subscribe(
        (response) => {
          this._snackBar.open('Juego añadido con éxito', undefined, {
            duration: 1500,
            panelClass: ['app-notification-success', 'center'],
          });
          this.gameAddedSuccessfully.emit();
        },
        (error) => {
          // Manejar errores de autenticación
          console.error('Error durante el inicio de sesión:', error);
        }
      );
      /*       const searchMenuButton = document.querySelector(
        '.add-game-search-menu-button'
      ) as HTMLElement;
      searchMenuButton.click(); */
    }
  }
}
