import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey = 'AIzaSyDvMAiFxwQ7V_fkXijJBAV9rjzVvJIy5eY';

  constructor(public http: HttpClient) { }

  getVideosForChanel(channel, maxResults) {
    // tslint:disable-next-line: max-line-length
    const url = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&channelId=${channel}&order=date&part=snippet&type=video,id&maxResults=${maxResults}`;
    return this.http.get(url);
  }
}
