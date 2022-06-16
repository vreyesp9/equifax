import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {

  constructor() { }


  selected = {};
  private messageSource = new BehaviorSubject<any>(this.selected);
  currentMessage: Observable<any> = this.messageSource.asObservable();
  sendData(message) {
    this.messageSource.next(message)
  }

}
