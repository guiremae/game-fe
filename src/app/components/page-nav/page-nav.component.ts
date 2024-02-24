import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.scss'],
})
export class PageNavComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  @Output() pageSelected = new EventEmitter<number>();

  @Input() pageNumber: number = 1;

  @Input() numberOfGames: number = 0;

  ngOnInit(): void {}

  onPageSelected(page: number) {
    const currentPage = this.route.snapshot.params['page'];
    const currentUrl = this.router.url;
    const lastIndex = currentUrl.lastIndexOf('/');

    if (currentPage) {
      const newUrl = currentUrl.substring(0, lastIndex + 1) + page;
      this.router.navigate([newUrl], { relativeTo: this.route });
    } else {
      this.router.navigate(['./', page], { relativeTo: this.route });
    }
  }
}
