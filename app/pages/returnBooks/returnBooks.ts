import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {GatewayUtils} from '../../services/GatewayUtils';
import {BookUtils} from '../../services/BookUtils';
import {Book} from '../../dao/Book';
import {Borrower} from '../../dao/Borrower';
import {SearchPipe} from "../../pipes/SearchPipe";

@Component({
  templateUrl: 'build/pages/returnBooks/returnBooks.html',
  providers: [BookUtils, GatewayUtils],
  pipes: [SearchPipe]
})
export class ReturnBooksPage {
  private borrowers:Borrower[] = [];
  private itemsearch:string = "";

  constructor(private navCtrl: NavController, private bookUtils:BookUtils, private gatewayUtils:GatewayUtils) {
  }
  onPageDidEnter() {
    this.gatewayUtils.provideInfo().subscribe(
       borrowers => this.borrowers = borrowers.json(),
       error => alert("Ein fehler ist aufgetreten: " + JSON.stringify(<any>error)));
  }

  returnBook(borrower:Borrower) {
    this.bookUtils.getISBN().then((isbn:string) => {
      return this.gatewayUtils.returnBook(isbn, borrower).subscribe(
         res => {},
         error => alert("Ein fehler ist aufgetreten: " + JSON.stringify(<any>error)));;
    });
  }
}
