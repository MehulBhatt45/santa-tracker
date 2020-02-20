import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import loadjs from 'loadjs';
import { YoutubeService } from '../services/youtube.service';
import { takeUntil } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
declare const $: any;

@Component({
  selector: 'app-feeds',
  templateUrl: 'feeds.page.html',
  styleUrls: ['feeds.page.scss']
})
export class FeedsPage implements OnInit {
  current = 'instagram';
  currentTwit = 'officialSTteam';
  ytChannelId = 'UCS7ZMbLW5Tz3nNSEzRmf9CA';
  instId = environment.officialsantatrackerteamId;
  instaToken = environment.officialsantatrackerteamToken;
  config: any = {
    count: 1000, // any int value
    idUser: this.instId,
    tokenUser: this.instaToken,
    grid: false // false is list true is grid
  };
  private unsubscribe$: Subject<any> = new Subject();
  videos = [];
  instaFeeds = [];
  height = this.platform.height();
  width = this.platform.width();
  constructor(
    private ytService: YoutubeService, private change: ChangeDetectorRef, private http: HTTP, private senitizer: DomSanitizer,
    public platform: Platform) {
    // loadjs('https://apps.elfsight.com/p/platform.js');
  }

  segmentChanged(event) {
    this.current = event.target.value;
    console.log(this.current);
    this.change.detectChanges();
    if (this.current === 'youtube') {
      this.getYouTubeVideos();
    }
    if (this.current === 'instagram') {
      this.getInstaFeeds();
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

  ngOnInit() {
    console.log('Loaded');
    this.getInstaFeeds();
  }

  ionViewWillLoad() {
    this.instagramPosts();
    // this.getYouTubeVideos();
  }

  getYouTubeVideos() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`https://www.googleapis.com/youtube/v3/search?key=${environment.googleApi}&channelId=${this.ytChannelId}&order=date&part=snippet&type=video&maxResults=${50}`, {}, {}).then(res => {
      const data = res.data;
      return JSON.parse(data);
    }).then((lista: any) => {
      this.videos = lista.items;
      this.change.detectChanges();
    }).catch(err => {
      console.log(err);
    });

    // tslint:disable-next-line: max-line-length
    // this.ytService.getVideosForChanel(`https://www.googleapis.com/youtube/v3/search?key=${environment.googleApi}&channelId=${this.ytChannelId}&order=date&part=snippet&type=video&maxResults=${50}`).subscribe((res: any) => {
    //   this.instaFeeds = res.data;
    // }, err => {
    //   console.log(err);
    // });
  }

  getInstaFeeds() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`https://api.instagram.com/v1/users/${this.config.idUser}/media/recent/?count=${this.config.count}&access_token=${this.config.tokenUser}`, {}, {}).then(res => {
      const data = res.data;
      return JSON.parse(data);
    }).then((lista: any) => {
      this.instaFeeds = lista.data;
      this.change.detectChanges();
    }).catch(err => {
      console.log(err);
    });

    // tslint:disable-next-line: max-line-length
    // this.ytService.getVideosForChanel(`https://api.instagram.com/v1/users/${this.config.idUser}/media/recent/?count=${this.config.count}&access_token=${this.config.tokenUser}`).subscribe((res: any) => {
    //   console.log(res.data);
    //   this.instaFeeds = res.data;
    // }, err => {
    //   console.log(err);
    // });
  }

  ionViewWillLeave() { this.removeScript(); }

  changeTwit(twit) {
    console.log(twit);
    this.currentTwit = twit;
    this.change.detectChanges();
    if (this.currentTwit === 'officialSTteam') {
      $('.officialSTteam').addClass('tab-selected');
      $('.officialSTstore').removeClass('tab-selected');
    } else if (this.currentTwit === 'officialSTstore') {
      $('.officialSTstore').addClass('tab-selected');
      $('.officialSTteam').removeClass('tab-selected');
    }
  }

  getUrl(link) {
    return this.senitizer.bypassSecurityTrustResourceUrl(link + 'embed');
  }

}
