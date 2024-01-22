import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/interfaces/game.interface';
import { IgdbService } from 'src/app/services/igdb.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  coverURL: string = "";
  videoURL: any;

  slickConfig: any = {
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  constructor( private route: ActivatedRoute, private igdbService: IgdbService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.game = data['game'][0]; 
      if(this.game.cover.url)
      this.coverURL = "https://" + this.game.cover.url.replace("thumb", "1080p")
    if(this.game.videos && this.game.videos[0].video_id)
    console.log(this.game.videos[0].video_id);
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.game.videos[0].video_id}`);
    });    
  }

  getVideoURL(videoID: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoID}`);
  }

}



