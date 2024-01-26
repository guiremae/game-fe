import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/interfaces/game.interface';
import { IgdbService } from 'src/app/services/igdb.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game!: Game;
  cover: string = '';
  videos: any[] = [];
  pictures: any[] = [];

  slickConfig: any = {
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  constructor(
    private route: ActivatedRoute,
    private igdbService: IgdbService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.game = data['game'][0];
      const randomIndex = Math.floor(
        Math.random() *
          (this.game.screenshots.length + this.game.artworks.length)
      );
      this.pictures = this.game.artworks.concat(this.game.screenshots);
      const banner = this.pictures[randomIndex];
      this.cover = `https://${banner.url.replace('thumb', '1080p')}`;

      if (this.game.videos)
        this.game.videos.forEach((video) =>
          this.videos.push(
            this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/${video.video_id}`
            )
          )
        );
    });
  }

  getVideoURL(videoID: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoID}`
    );
  }
}
