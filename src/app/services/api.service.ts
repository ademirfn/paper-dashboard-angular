import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public oneSignalAuth = 'ZGUxMmE2YmItYjA2OC00NDA0LTgyOTEtMGUzOTJhZTM0Njk3';
  public oneSignalApp = '927f1818-769e-4d57-bad4-2dd1fdeca4d8';

  private wordpressApi = 'https://app-hydro.wideds.com.br/wp-json/hydro/v1';
  private monthlyCommentsUrl = '/monthly-comments-summary';
  private monthlyPostsComment = '/top-comments-by-month';
  private topLikesMonthly = '/top-likes-by-month';

  private monthlyPostsCommenters = '/top-commenters-by-month';
  private topLikersMonthly = '/top-likers-by-month';

  constructor(private http: HttpClient) { }

  requesPushs(offset: number) {
    console.log(offset);
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Basic ${this.oneSignalAuth}`);
      this.http.get(`https://api.onesignal.com/notifications?app_id=${this.oneSignalApp}&offset=${offset}`, { headers }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }

  requestMonthlyComments(){
    return new Promise<any>((resolve, reject) => {
      //const headers = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Basic ${this.oneSignalAuth}`);
      this.http.get(`${this.wordpressApi}${this.monthlyCommentsUrl}`).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }

  requestMonthlyPostsComments(){
    return new Promise<any>((resolve, reject) => {
      //const headers = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Basic ${this.oneSignalAuth}`);
      this.http.get(`${this.wordpressApi}${this.monthlyPostsComment}`).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }

  requestMonthlyPostsCommenters(){
    return new Promise<any>((resolve, reject) => {
      //const headers = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Basic ${this.oneSignalAuth}`);
      this.http.get(`${this.wordpressApi}${this.monthlyPostsCommenters}`).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }

  requestMonthlyTopLikes(){
    return new Promise<any>((resolve, reject) => {
      //const headers = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Basic ${this.oneSignalAuth}`);
      this.http.get(`${this.wordpressApi}${this.topLikesMonthly}`).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }

  requestMonthlyTopLikers(){
    return new Promise<any>((resolve, reject) => {
      //const headers = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Basic ${this.oneSignalAuth}`);
      this.http.get(`${this.wordpressApi}${this.topLikersMonthly}`).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }
}
