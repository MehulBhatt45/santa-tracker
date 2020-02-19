import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import loadjs from 'loadjs';
declare const $: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  websiteUrl = 'https://santatracker7.wixsite.com/santatracker';
  constructor(private iab: InAppBrowser) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // tslint:disable-next-line: max-line-length
    // document.getElementById('MightyCallCBW-658960de-a625-4ae2-9957-e7b425e2b350').style.setProperty('display', 'inline-block', 'important');
  }

  openWebsite() {
    const browser = this.iab.create(this.websiteUrl, '_system');
  }

  ionViewWillLeave() {
    // document.getElementById('MightyCallCBW-658960de-a625-4ae2-9957-e7b425e2b350').style.setProperty('display', 'none', 'important');
    // document.getElementById('mc__modal_658960de-a625-4ae2-9957-e7b425e2b350').style.setProperty('display', 'none', 'important');
  }

}
