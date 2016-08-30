export class Borrower {
  public id;
  public firstname;
  public lastname;
  constructor(){
    this.id = Math.random() * (1000000 - 1) + 1
  }
}
