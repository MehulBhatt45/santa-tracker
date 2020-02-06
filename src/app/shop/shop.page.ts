import { Component, OnInit } from '@angular/core';
import loadjs from 'loadjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.page.html',
  styleUrls: ['shop.page.scss']
})
export class ShopPage implements OnInit {
  loaded = true;
  constructor(private loadingCtrl: LoadingController) {}

  async ngOnInit() {
    // const loading = await this.loadingCtrl.create({
    //   spinner: 'bubbles',
    //   showBackdrop: true,
    //   message: 'Please wait...',
    //   cssClass: 'loader'
    // });
    // await loading.present();
    // const script = document.createElement('script');
    // script.id = 'spreadshirt';
    // script.type = 'text/javascrpt';
    // script.src = 'https://shop.spreadshirt.com/shopfiles/shopclient/shopclient.nocache.js';
    // document.appendChild(script);
    loadjs('https://shop.spreadshirt.com/shopfiles/shopclient/shopclient.nocache.js', () => {
      this.loaded = false;
    });
  }

  ionViewWillLeave() {
    // document.removeChild(document.getElementById('spreadshirt'));
  }

}
