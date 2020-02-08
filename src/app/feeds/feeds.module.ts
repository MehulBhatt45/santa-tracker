import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedsPage } from './feeds.page';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { NgxInstaModule } from 'ngx-insta';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: FeedsPage }]),
    NgxTwitterTimelineModule,
    NgxInstaModule
  ],
  declarations: [FeedsPage]
})
export class FeedsModule {}
