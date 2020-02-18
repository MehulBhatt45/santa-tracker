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
import { NgxInstaModule } from 'ngx-insta';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from './services/truncate.pipe';

@NgModule({
  declarations: [AppComponent, TruncatePipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxTwitterTimelineModule,
    HttpClientModule,
    NgxInstaModule
  ],
  providers: [
    DatePipe,
    StatusBar,
    SplashScreen,
    FCM,
    HTTP,
    MobileAccessibility,
    InAppBrowser,
    TruncatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
