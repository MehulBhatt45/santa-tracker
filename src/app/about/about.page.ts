import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  websiteUrl = 'https://santatracker7.wixsite.com/santatracker';
  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
  }

  openWebsite() {
    const browser = this.iab.create(this.websiteUrl, '_system');
  }

}
