import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  websiteUrl = 'https://santatracker7.wixsite.com/santatracker';
  constructor(private iab: InAppBrowser) { }
  openWebsite() {
    const browser = this.iab.create(this.websiteUrl, '_system');
  }
}
