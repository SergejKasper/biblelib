import {Component, ViewChild} from '@angular/core';
import {Alert, NavController} from 'ionic-angular';
import {List} from 'ionic-angular';
import {Book} from '../../dao/Book';
import {BarcodeScanner, Camera } from 'ionic-native';
@Component({
  templateUrl: 'build/pages/addBooks/addBooks.html'
})
export class AddBooksPage {
  @ViewChild(List) bookList: List;
  private books:Book[] = [];

  constructor(private navCtrl: NavController) {}
  onPageDidEnter() {
    this.books = JSON.parse(localStorage.getItem("todos"));
    if(!this.books) {
        this.books = [{
          id: 0,
          title: 'Ben Sparrow',
          description: 'You on your way?',
          image: 'img/ben.png'
        }, {
          id: 1,
          title: 'Max Lynx',
          description: 'Hey, it\'s me',
          image: 'img/max.png'
        }, {
          id: 2,
          title: 'Adam Bradleyson',
          description: 'I should buy a boat',
          image: 'img/adam.jpg'
        }, {
          id: 4,
          title: 'Mike Harrington',
          description: 'This is good ice cream.',
          image: 'img/mike.png'
        }];
    }
  }

  delete(index: number) {
      this.books.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(this.books));
  }

  add() {
    var book = {};
    let augmentWithCode = (book):any => {
      return BarcodeScanner.scan().then(function(data){
        //$scope.response = data;
        book.id = data.text;
        return book;
      },function(error){
        alert(error);
      });
    }
    let augmentWithInfo = (book:Book):any => {
      return new Promise<Book>((resolve, reject) =>{
        let alert = Alert.create({
          title: 'Titel und Beschreibung',
          inputs: [
            {
              name: 'title',
              placeholder: 'Buchtitel'
            },
            {
              name: 'description',
              placeholder: 'Beschreibung'
            }
          ],
          subTitle: 'Gib den Titel und die Beschreibung an',
          buttons: [
              { text: 'Abbrechen' },
              {
                text: 'Übernehmen',
                type: 'button-positive',
                handler: data => {
                  if (!data.title) {
                    //don't allow the user to close unless he enters wifi password
                    //e.preventDefault();
                  } else {
                    book.title = data.title;
                    book.description = data.description;
                    alert.dismiss().then(() => resolve(book));
                  }
                }
              }
            ]
          });
        this.navCtrl.present(alert);
      });
    };
  let augmentWithImage = (book):any => {
      return Camera.getPicture({}).then(function(imageData) {
        book.image = "data:image/jpeg;base64," + imageData;
        return book;
      }, function(err) {
              // An error occured. Show a message to the user
    });
  }
  augmentWithCode(book).then((book) => augmentWithInfo(book)).then((book) => augmentWithImage(book)).then((book)=>{
    this.books.push(book);
    window.alert(JSON.stringify(book));
    localStorage.setItem("todos", JSON.stringify(this.books));
  });
  }
}
