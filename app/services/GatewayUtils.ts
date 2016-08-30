import {Observable} from "../../node_modules/rxjs/Observable.d";
import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {AlertController} from 'ionic-angular';
import {List} from 'ionic-angular';
import {Borrower} from '../dao/Borrower';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {BarcodeScanner, Camera } from 'ionic-native';
import {BookUtils} from './BookUtils';


@Injectable()
export class GatewayUtils {
  private borrowerUrl:string;
  private interactionUrl:string;
  private interactionOpts:RequestOptions;
  constructor(private alertController: AlertController, private http:Http, private bookUtils:BookUtils){
    this.borrowerUrl = "http://" + bookUtils.host + ":8080/socketapi/borrowers";
    this.interactionUrl = "http://" + bookUtils.host + ":8080/socketapi/interaction";
    this.interactionOpts = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json'}) });
  }
  public provideInfo():Observable<Response> {
    return this.http.get(this.borrowerUrl);
  };
  public borrowBook(isbn: string, borrower:Borrower, cover?:string): any {
    let data:any = {isbn: isbn, action: "BORROW", borrower: borrower};
    if(cover) data.cover = cover;
    return this.http.post(this.interactionUrl, data, this.interactionOpts);
  }
  public returnBook(isbn: string, borrower:Borrower){
    let data:any = {isbn: isbn, action: "RETURN", borrower: borrower};
    return this.http.post(this.interactionUrl, data, this.interactionOpts);
  }
  public addBook(isbn: string, cover?:string):Observable<Response>{
    let data:any = {isbn: isbn, action: "NEW"};
    if(cover) data.cover = cover;
    return this.http.post(this.interactionUrl, data, this.interactionOpts);
  }
}
