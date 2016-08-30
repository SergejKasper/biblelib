import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BookUtils} from '../../services/BookUtils';
import {GatewayUtils} from '../../services/GatewayUtils';
import {Book} from '../../dao/Book';
import {Borrower} from '../../dao/Borrower';
import {SearchPipe} from "../../pipes/SearchPipe";
@Component({
  templateUrl: 'build/pages/borrowBooks/borrowBooks.html',
  providers: [BookUtils, GatewayUtils],
  pipes: [SearchPipe]
})
export class BorrowBooksPage {
  private borrowers:Borrower[] = [];
  private itemsearch:string = "";
  private interactionUrl:string;

  constructor(private navCtrl: NavController, private bookUtils:BookUtils, private gatewayUtils:GatewayUtils) {

  }
  onPageDidEnter() {
    //localStorage.removeItem("borrowBooks-" + this.borrower.id);
    this.gatewayUtils.provideInfo().subscribe(
       borrowers => this.borrowers = borrowers.json(),
       error => alert("Ein fehler ist aufgetreten: " + JSON.stringify(<any>error)));
  }


  borrowBook(borrower:Borrower) {
    this.bookUtils.getISBN()
    .then((isbn) => {
      this.gatewayUtils.borrowBook(isbn, borrower)
    });
  }
}
