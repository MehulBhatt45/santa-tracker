import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import loadjs from 'loadjs';
import { YoutubeService } from '../services/youtube.service';
import { takeUntil } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
declare const $: any;

@Component({
  selector: 'app-feeds',
  templateUrl: 'feeds.page.html',
  styleUrls: ['feeds.page.scss']
})
export class FeedsPage implements OnInit {
  current = 'facebook';
  currentTwit = 'officialSTteam';
  ytChannelId = 'UCS7ZMbLW5Tz3nNSEzRmf9CA';
  private unsubscribe$: Subject<any> = new Subject();
  videos = [];
  constructor(private ytService: YoutubeService, private change: ChangeDetectorRef, private http: HTTP) {
    // loadjs('https://apps.elfsight.com/p/platform.js');
  }

  segmentChanged(event) {
    this.current = event.target.value;
    console.log(this.current);
    this.change.detectChanges();
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

  ngOnInit() {
    console.log('Loaded');
  }

  ionViewWillLoad() {
    this.instagramPosts();
    // this.getYouTubeVideos();
  }

  getYouTubeVideos() {
    this.http.get(`https://www.googleapis.com/youtube/v3/search?key=${environment.googleApi}&channelId=${this.ytChannelId}&order=date&part=snippet&type=video&maxResults=${50}`, {}, {}).then(res => {
    const data = res.data;
    console.log(data);
    return JSON.parse(data);
    }).then((lista: any) => {
      console.log(lista);
      this.videos = lista.items;
      this.change.detectChanges();
      // for (const element of lista.items) {
      //   this.videos.push(element);
      // }
    }).catch(err => {
      console.log(err)     
    })
    // this.ytService.getVideosForChanel(this.ytChannelId, 50)
    // .subscribe((lista: any) => {
    //     if(lista && lista.items){
    //       for (const element of lista.items) {
    //         this.videos.push(element);
    //       }
    //     }else{
    //       console.log(lista);
    //     }

    //   }, err => {
    //     console.error(err)
    //   });
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
