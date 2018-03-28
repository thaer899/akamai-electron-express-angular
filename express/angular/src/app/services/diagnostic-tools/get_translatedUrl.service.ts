import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { translatedUrl } from '../../models/translatedUrl';
const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json',
'':'' })
};

@Injectable()

export class GetTranslatedUrlService {

  public getTranslatedUrlSubject = new Subject<translatedUrl>();

  constructor(private http:HttpClient) {

  }

  getTranslatedUrl(url) {
    let params= new HttpParams().set("url", url);
    this.http.get<any>('http://localhost:3000/diagnostic-tools/v2/translated-url',{params:params}).subscribe(
      res => {
        this.getTranslatedUrlSubject.next(res.data.translatedUrl);

      }
    );
  }
}
