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
    // const option = {headers: new HttpHeaders({
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    //   'Accept': 'application/json',
    //   'content-type': 'application/json'
    // })}
    // tslint:disable-next-line: max-line-length
    // const url = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&channelId=${channel}&order=date&part=snippet&type=video&maxResults=${maxResults}`;
    return this.http.get(url);
  }
}
