import { Component, ElementRef } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  FormBuilder,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { List } from 'src/app/models/interfaces/list.interface';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrl: './my-lists.component.scss',
})
export class MyListsComponent {
  constructor(private formBuilder: FormBuilder, private el: ElementRef) {}
  movieForm!: UntypedFormGroup;
  changesHistory: any[] = [];
  currentIndex: number = 0;
  deletedMovies: any[] = [];
  public adding: boolean = false;

  formGroup = new UntypedFormGroup({
    title: new UntypedFormControl('', Validators.required),
    id: new UntypedFormControl(''),
  });

  movies = [
    {
      title: 'Episode I - The Phantom Menace',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg',
      index: 0,
    },
    {
      title: 'Episode II - Attack of the Clones',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg',
      index: 1,
    },
    {
      title: 'Episode III - Revenge of the Sith',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg',
      index: 2,
    },
    {
      title: 'Episode IV - A New Hope',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg',
      index: 3,
    },
    {
      title: 'Episode V - The Empire Strikes Back',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg',
      index: 4,
    },
    {
      title: 'Episode VI - Return of the Jedi',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg',
      index: 5,
    },
    {
      title: 'Episode VII - The Force Awakens',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg',
      index: 6,
    },
    {
      title: 'Episode VIII - The Last Jedi',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg',
      index: 7,
    },
    {
      title: 'Episode IX – The Rise of Skywalker',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/a/af/Star_Wars_The_Rise_of_Skywalker_poster.jpg',
      index: 8,
    },
    {
      title: 'Episode V - The Empire Strikes Back',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg',
      index: 9,
    },
    {
      title: 'Episode VI - Return of the Jedi',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg',
      index: 10,
    },
    {
      title: 'Episode VII - The Force Awakens',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg',
      index: 11,
    },
    {
      title: 'Episode VIII - The Last Jedi',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg',
      index: 12,
    },
    {
      title: 'Episode IX – The Rise of Skywalker',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/a/af/Star_Wars_The_Rise_of_Skywalker_poster.jpg',
      index: 13,
    },
    {
      title: 'Episode VIII - The Last Jedi',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg',
      index: 14,
    },
    {
      title: 'Episode IX – The Rise of Skywalker',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/a/af/Star_Wars_The_Rise_of_Skywalker_poster.jpg',
      index: 15,
    },
  ];

  public listCollection: List[] = [
    { title: 'Lista 1', id: 0, games: this.movies },
  ];

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      movies: this.formBuilder.array([]),
    });

    this.movies.forEach((movie) => {
      this.addMovie(movie);
    });
    this.saveChangesToHistory(false);
  }

  get moviesFormArray(): UntypedFormArray {
    return this.movieForm.get('movies') as UntypedFormArray;
  }

  addMovie(movieData: { title: string; poster: string; index: number }) {
    const movieGroup = this.formBuilder.group({
      title: [movieData.title, Validators.required],
      poster: [movieData.poster, Validators.required],
      index: [movieData.index, Validators.required],
    });
    this.moviesFormArray.insert(movieData.index, movieGroup);
  }

  removeMovie(index: number) {
    const removedMovie = this.moviesFormArray.at(index).value;
    this.deletedMovies.push(removedMovie);
    this.moviesFormArray.removeAt(index);
    this.saveChangesToHistory(true);
    this.moviesFormArray.markAsDirty();
  }

  drop(event: any) {
    moveItemInArray(
      this.moviesFormArray.controls,
      event.previousIndex,
      event.currentIndex
    );
    this.moviesFormArray.markAsDirty();
    this.moviesFormArray.controls.forEach((control, index) => {
      control.get('index')?.setValue(index);
    });
    this.saveChangesToHistory(false);
  }

  saveChanges() {
    this.moviesFormArray.markAsPristine();
  }

  saveChangesToHistory(removed: boolean) {
    const array = this.moviesFormArray.value;
    const snapshot = JSON.parse(JSON.stringify(array));
    this.changesHistory.push({ snapshot, removed });
    this.currentIndex = this.changesHistory.length - 1;
  }

  undoChanges() {
    if (this.changesHistory.length > 1) {
      const currentStep = this.changesHistory.pop();
      const previousStep = this.changesHistory[this.changesHistory.length - 1];

      if (currentStep.removed) {
        this.restoreDeletedMovie();
      } else {
        this.moviesFormArray.clear();
        previousStep.snapshot.forEach((movieData: any) => {
          this.addMovie(movieData);
        });
      }

      this.currentIndex--;

      if (this.currentIndex === 0) {
        this.moviesFormArray.markAsPristine();
      }
    }
  }

  restoreDeletedMovie() {
    if (this.deletedMovies.length > 0) {
      const lastDeletedMovie = this.deletedMovies.pop();
      this.addMovie(lastDeletedMovie);
    }
  }

  onListSelection(ev: MatSelectionListChange) {
    while (this.moviesFormArray.length !== 0) {
      this.moviesFormArray.removeAt(0);
    }
    this.changesHistory = [];
    this.currentIndex = 0;
    const games = ev.source.selectedOptions.selected[0].value.games
      ? ev.source.selectedOptions.selected[0].value.games
      : [];
    games.forEach((game: any) => {
      this.addMovie(game);
    });
    if (games[0]) this.saveChangesToHistory(false);
  }

  saveNewList(event: any) {
    event.stopPropagation();
    if (this.formGroup.valid) {
      this.listCollection.push(this.formGroup.getRawValue());
      this.adding = false;
      this.formGroup.reset();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
