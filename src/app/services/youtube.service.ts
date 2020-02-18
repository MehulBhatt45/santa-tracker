import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey = environment.googleApi;

  constructor(public http: HttpClient) { }

  getVideosForChanel(url) {
    const option = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'content-type': 'application/json',
        Authorization: `Bearer ${environment.ticketSourceToken}`
      })
    };
    // tslint:disable-next-line: max-line-length
    // const url = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&channelId=${channel}&order=date&part=snippet&type=video&maxResults=${maxResults}`;
    return this.http.get(url, option);
  }
}
