import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {HTTP} from "@ionic-native/http";

const apiUrl = 'https://bsafe.tepongoenred.com/';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http, public nativeHttp: HTTP) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      //Don't check SSL Certificate
      this.nativeHttp.setSSLCertMode('nocheck');
      this.nativeHttp.setHeader('*', 'content-type','application/json');
      //Important to set the data serializer or the request gets rejected
      this.nativeHttp.setDataSerializer('json');
      this.nativeHttp.post(apiUrl+type, credentials, {}).then(res =>{
        resolve(JSON.parse(res.data));
      }, (err) =>{
        reject(err);
      });
    });
  }
  /*
  postData(credentials, type){
    let httpOptions = {
      headers: new Headers({})
    };
    return new Promise((resolve, reject) =>{
      // @ts-ignore
      this.http.post(apiUrl+type, JSON.stringify(credentials), httpOptions).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });
    });
  }

   */
}
