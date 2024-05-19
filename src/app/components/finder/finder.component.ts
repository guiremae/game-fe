import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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

  public searchingInput: string = '';
  public suggestions$!: Observable<any[]>;
  private searchTerms = new Subject<string>();

  constructor(private router: Router, private igdbService: IgdbService) {}

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
    const formData = this.searchForm.value;
    const searchMenuButton = document.querySelector(
      '.search-menu-button'
    ) as HTMLElement;
    searchMenuButton.click();
    this.searchForm.reset();
    this.searchTerms.next('');
    this.router.navigate([`/search/${formData.gameName}`]);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  selectSuggestion(suggestion: any): void {
    const searchMenuButton = document.querySelector(
      '.search-menu-button'
    ) as HTMLElement;
    searchMenuButton.click();
    this.searchForm.reset();
    this.searchTerms.next('');
    this.router.navigate([`/game/${suggestion.id}`]);
  }
}
