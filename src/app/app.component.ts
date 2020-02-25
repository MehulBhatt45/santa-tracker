import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private toastCtrl: ToastController,
    private photo: PhotoViewer,
    private streamingMedia: StreamingMedia
  ) {
    this.initializeApp();
  }

  options: StreamingVideoOptions = {
    successCallback: () => { console.log('Video played'); },
    errorCallback: (e) => { console.log('Error streaming', e); },
    orientation: 'landscape',
    shouldAutoClose: true,
    controls: true
  };

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.getToken().then(token => {
        console.log(token);
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });
      this.fcm.onNotification().subscribe(async (data) => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
          if (data.image) {
            console.log('data in toast image', data);
            this.photo.show(data.image, 'Santa Tracker', { share: true });
          } else if (data.video) {
            console.log('data in toast video', data);
            this.streamingMedia.playVideo(data.video, this.options);
          }
        } else {
          console.log('Received in foreground');
          const toast = await this.toastCtrl.create({
            header: 'Hello!',
            message: `You have received a notification.`,
            position: 'top',
            buttons: [
              {
                text: 'View',
                handler: () => {
                  if (data.image) {
                    console.log('data in toast image', data);
                    this.photo.show(data.image, 'Santa Tracker', { share: true });
                  } else if (data.video) {
                    console.log('data in toast video', data);
                    this.streamingMedia.playVideo(data.video, this.options);
                  }
                }
              }, {
                text: 'Close',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          toast.present();
        }
      });
      this.platform.backButton.subscribeWithPriority(0, () => {
        // this.platform.exitApp();

        // or if that doesn't work, try
        // tslint:disable-next-line: no-string-literal
        navigator['app'].exitApp();
      });
    });
  }
}
