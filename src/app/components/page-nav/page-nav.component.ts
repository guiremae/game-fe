import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.scss']
})
export class PageNavComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  @Output() pageSelected = new EventEmitter<number>();

  @Input() pageNumber: number = 1

  @Input() numberOfGames: number = 0

  ngOnInit(): void {
  }

  onPageSelected(page: number){
    this.pageNumber = page;
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0)
    this.pageSelected.emit(page);
  }
}
