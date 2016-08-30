/// <reference path="../../../typings/index.d.ts"/>

import {Component, ViewChild} from '@angular/core';
import {Alert, NavController} from 'ionic-angular';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Cookie } from 'ng2-cookies/ng2-cookies';
import {List} from 'ionic-angular';
import {Book} from '../../dao/Book';
import {BookUtils} from '../../services/BookUtils';
import {GatewayUtils} from '../../services/GatewayUtils';
import {BarcodeScanner, Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/addBooks/addBooks.html',
  providers: [BookUtils, GatewayUtils]
})
export class AddBooksPage {
  @ViewChild(List) bookList: List;
  private books:Book[] = [];
  private interactionUrl:string;

  constructor(private navCtrl: NavController, private bookUtils:BookUtils,private gatewayUtils:GatewayUtils, private http:Http) {
  }
  onPageDidEnter() {
    this.books = JSON.parse(localStorage.getItem("books"));
    if(!this.books) {
        this.books = [];
    }
  }

  delete(index: number) {
      this.books.splice(index, 1);
      localStorage.setItem("books", JSON.stringify(this.books));
  }

  add() {
    this.bookUtils.getISBN().then((isbn:string)=>{
      //Check if this is a 'real' ISBN (10 or 13 digets) or a custom/self-defined ISBN
      //alert(isbn);
      if(isbn.length !== 10 && isbn.length !== 13 ) return this.bookUtils.getCover().then((cover:string) => this.gatewayUtils.addBook(isbn, cover));
      this.gatewayUtils.addBook(isbn).subscribe(
         res => alert("Added Book" + JSON.stringify(res.json())),
         error => alert("Ein fehler ist aufgetreten: " + JSON.stringify(<any>error)));
    })
  }
}
