import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { YoutubeService } from '../services/youtube.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../services/truncate.pipe';
import { DomSanitizer } from '@angular/platform-browser';
declare const $: any;
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  allEvents = [];
  constructor(
    private http: HTTP,
    private ytService: YoutubeService,
    private iab: InAppBrowser,
    private dateFilter: DatePipe,
    private truncate: TruncatePipe,
    private senitizer: DomSanitizer,
    private change: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    const httpOptions = {
      Authorization: `Bearer ${environment.ticketSourceToken}`
    };
    this.http.get('https://api.ticketsource.io/events', {}, httpOptions).then((res: any) => {
      console.log(res);
      const data = res.data;
      return JSON.parse(data);
    }).then(async (jsonRes) => {
      this.allEvents = jsonRes.data;
      await this.allEvents.map(async (ev, i) => {
        await this.getMetaData(ev.links.venues, i);
        await this.getMetaData(ev.links.dates, i);
      });
      console.log(this.allEvents);
      this.change.detectChanges();
    }).catch(err => {
      console.log(err);
    });
    // this.ytService.getVideosForChanel('https://api.ticketsource.io/events').subscribe(res => {
    //   console.log(res);
    // }, err => {
    //   console.log(err);
    // });
  }

  getMetaData(url: string, index) {
    const httpOptions = {
      Authorization: `Bearer ${environment.ticketSourceToken}`
    };
    this.http.get(url, {}, httpOptions).then((res: any) => {
      console.log(res);
      const data = res.data;
      return JSON.parse(data);
    }).then(async (jsonRes) => {
      console.log(jsonRes);
      // this.allEvents = jsonRes.data;
      if (url.includes('venues')) {
        this.allEvents[index].venue = await jsonRes.data[0].attributes;
      } else if (url.includes('dates')) {
        this.allEvents[index].dates = await jsonRes.data[0].attributes;
        this.allEvents[index].book_now = await jsonRes.data[0].links.book_now;
      }
      this.change.detectChanges();
    }).catch(err => {
      console.log(err);
    });
  }

  bookNow(bookNowUrl) {
    const browser = this.iab.create(bookNowUrl, '_system');
  }

  getTime(time) {
    return this.dateFilter.transform(time, 'hh:mm a', '+0000');
  }

  getSlicedContent(content) {
    return this.senitizer.bypassSecurityTrustHtml(this.truncate.transform(content, 100, true));
  }

  moreDetails(event) {
    alert('Clicked');
    console.log(event);
  }

  flip(id) {
    $(`#${id}`).toggleClass('flipped');
  }

}

@Component({
  selector: 'flash-card',
  template: `
  <div class="flip-container" [class.flipped]="flipped">
      <div class="flipper">
          <div class="front" (click)="flip()">
              <ng-content select=".flash-card-front"></ng-content>
          </div>
          <div class="back" (click)="flip()">
              <ng-content select=".flash-card-back"></ng-content>
          </div>
      </div>
  </div>`,
  styleUrls: ['./events.page.scss'],
})
export class FlashCardComponent implements OnInit {
  flipped = false;
  constructor() { }

  ngOnInit() { }

  flip() {
    this.flipped = !this.flipped;
  }
}
