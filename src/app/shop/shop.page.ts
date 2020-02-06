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

  ngOnInit() {

  }
  
  async ionViewDidLoad() {
    loadjs('https://shop.spreadshirt.com/shopfiles/shopclient/shopclient.nocache.js', () => {
      this.loaded = false;
      this.mobileAccessibility.isScreenReaderRunning().then(() => {
        console.log('this.mobileAccessibility.isScreenReaderRunning() true');
        this.mobileAccessibility.speak("This is demo speech for usage of mobile accessability");
      }).catch(err => {
        console.log(err);
      })
    });
  }

  ionViewWillLeave() {
    // document.removeChild(document.getElementById('spreadshirt'));
  }

}
