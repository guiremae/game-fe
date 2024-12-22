import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  constructor(
    public modalService: ModalService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe('(max-width: 1279.98px)')
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  public isSmallScreen = false;
  @Input() public videos!: string[];
  @Input() public pictures!: any[];
  currentIndex = 0;

  get mediaList(): any[] {
    const combinedArray: any[] = [];

    // Agregar videos con tipo 'video'
    this.videos.forEach((video) => {
      combinedArray.push({ type: 'video', url: video });
    });

    // Agregar imágenes con tipo 'image'
    this.pictures.forEach((picture) => {
      combinedArray.push({
        type: 'image',
        url: `${picture.url.replace('thumb', 'screenshot_med')}`,
      });
    });

    return combinedArray;
  }

  get visibleContent(): any[] {
    const remainingElements = this.mediaList.length - this.currentIndex;
    return this.mediaList.slice(
      this.currentIndex,
      this.currentIndex + Math.min(1, remainingElements)
    );
  }

  get showPrevButton(): boolean {
    return this.currentIndex > 0;
  }

  get showNextButton(): boolean {
    return this.currentIndex < this.mediaList.length - 1;
  }

  prevContent() {
    if (this.showPrevButton) {
      this.currentIndex = Math.max(0, this.currentIndex - 1);
    }
  }

  nextContent() {
    if (this.showNextButton) {
      this.currentIndex = Math.min(
        this.mediaList.length - 1,
        this.currentIndex + 1
      );
    }
  }
}
