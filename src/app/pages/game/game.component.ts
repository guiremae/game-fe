import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/interfaces/game.interface';

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
  websites: any[] = [];

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.game = data['game']['game'][0];
      this.game.rating = data['game']['rating']
        ? data['game']['rating']['score']
        : null;
      this.getRandomBanner();
      this.getVideos();
      this.websites = data['game']['websites'];
    });
  }

  getRandomBanner() {
    const randomIndex = Math.floor(
      Math.random() *
        (this.game.screenshots?.length + this.game.artworks?.length)
    );
    this.pictures = this.game.artworks
      ? this.game.artworks.concat(this.game.screenshots)
      : this.game.screenshots;
    const banner = this.pictures[randomIndex];
    this.cover = `https://${banner?.url.replace('thumb', '1080p')}`;
  }

  getVideos() {
    if (this.game.videos)
      this.game.videos.forEach((video) =>
        this.videos.push(this.getVideoURL(video.video_id))
      );
  }

  getVideoURL(videoID: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoID}`
    );
  }
}
