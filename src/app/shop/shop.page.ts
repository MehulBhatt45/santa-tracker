import { Component, OnInit } from '@angular/core';
import loadjs from 'loadjs';
import { LoadingController } from '@ionic/angular';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.page.html',
  styleUrls: ['shop.page.scss']
})
export class ShopPage implements OnInit {
  loaded = true;
  constructor(private loadingCtrl: LoadingController, private mobileAccessibility: MobileAccessibility) {}

  async ngOnInit() {
    loadjs('https://shop.spreadshirt.com/shopfiles/shopclient/shopclient.nocache.js', () => {
      this.loaded = false;
      this.mobileAccessibility.isScreenReaderRunning().then(() => {
        this.mobileAccessibility.speak("This is demo speech for usage of mobileaccessability");
      })
    });
  }

  ionViewWillLeave() {
    // document.removeChild(document.getElementById('spreadshirt'));
  }

}
