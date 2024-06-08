import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/interfaces/game.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  constructor(private route: ActivatedRoute) {}

  private dataResolver: any;
  public games: any[] = [];
  public scores: any[] = [];
  public title: string = '';

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.dataResolver = data['resolver'];
      this.games = this.dataResolver.games;
      this.title = this.dataResolver.title;
    });
  }

  getColor(value: number): string {
    if (value >= 0 && value <= 4) {
      return 'red';
    } else if (value >= 5 && value < 7) {
      return 'yellow';
    } else if (value >= 7 && value < 9) {
      return 'green';
    } else if (value >= 9 && value < 10) {
      return 'purple';
    } else if (value == 10) {
      return '#C69749';
    } else {
      return 'transparent';
    }
  }
}
