import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { FCM } from '@ionic-native/fcm/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxTwitterTimelineModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    HTTP,
    MobileAccessibility,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
