import {Injectable} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {List} from 'ionic-angular';
import {Book} from '../dao/Book';
import {BarcodeScanner, Camera } from 'ionic-native';

@Injectable()
export class BookUtils {
  public host:string = '192.168.2.103';

  //public host:string = '10.112.43.82';
  constructor(private alertController: AlertController){
  }
  public setIp(){
    let alert = this.alertController.create({
      title: 'URL',
      inputs: [
        {
          name: 'host',
          placeholder: 'Buchtitel',
          value: '192.168.2.103'
        }
      ], buttons: [
          { text: 'Abbrechen' },
          {
            text: 'Übernehmen',
            type: 'button-positive',
            handler: data => {
              if (!data.url) {
                //don't allow the user to close unless he enters wifi password
                //e.preventDefault();
              } else {
                this.host = data.host;
              }
            }
          }
        ]
    });
    alert.present();
  }

  public getISBN():Promise<string> {
    return BarcodeScanner.scan({"preferFrontCamera" : true}).then(function(data){
      return data.text;
    },function(error){
      alert(error);
    });
  };

  public getCover():any {
      return Camera.getPicture({}).then(function(imageData) {
        return imageData;
      }, function(error) {
        alert(error);
    });
  };
}
