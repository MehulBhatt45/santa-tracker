import { Component } from '@angular/core';
import loadjs from 'loadjs';
import { YoutubeService } from '../services/youtube.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare const $: any;

@Component({
  selector: 'app-feeds',
  templateUrl: 'feeds.page.html',
  styleUrls: ['feeds.page.scss']
})
export class FeedsPage {
  current = 'facebook';
  currentTwit = 'officialSTteam';
  ytChannelId = 'UCS7ZMbLW5Tz3nNSEzRmf9CA';
  private unsubscribe$: Subject<any> = new Subject();
  videos = [];
  constructor(private ytService: YoutubeService) {
    // loadjs('https://apps.elfsight.com/p/platform.js');
  }

  segmentChanged(event) {
    console.log(event.target.value);
    this.current = event.target.value;
    if (this.current === 'youtube') {
      this.getYouTubeVideos();
    }
  }

  removeScript() {
    const fjs = document.getElementsByTagName('script')[0];

    fjs.parentNode.removeChild(document.getElementById('instagram-wjs'));

  }
  instagramPosts() {
    const instaFunc = (d, s, id) => {
      let js: any;
      const fjs = d.getElementsByTagName(s)[0];

      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.setAttribute('onLoad', 'window.instgrm.Embeds.process()');
        js.id = id;
        js.src = 'https://platform.instagram.com/en_US/embeds.js';

        fjs.parentNode.insertBefore(js, fjs);
      }
    };
    instaFunc(document, 'script', 'instagram-wjs');
  }

  ionViewWillLoad() {
    this.instagramPosts();
    // this.getYouTubeVideos();
  }

  getYouTubeVideos() {
    this.ytService.getVideosForChanel(this.ytChannelId, 50).pipe(takeUntil(this.unsubscribe$))
      .subscribe((lista: any) => {
        console.log(lista);
        for (const element of lista.items) {
          this.videos.push(element);
        }
      });
  }

  ionViewWillLeave() { this.removeScript(); }

  changeTwit(twit) {
    console.log(twit);
    this.currentTwit = twit;
    if (this.currentTwit === 'officialSTteam') {
      $('.officialSTteam').addClass('tab-selected');
      $('.officialSTstore').removeClass('tab-selected');
    } else if (this.currentTwit === 'officialSTstore') {
      $('.officialSTstore').addClass('tab-selected');
      $('.officialSTteam').removeClass('tab-selected');
    }
  }

}
