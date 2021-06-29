import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHandlerService {

  constructor() { }

  public setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
    
  public getItem(key: string) { 
    return localStorage.getItem(key)
  }

  public removeItem(key:string) {
    localStorage.removeItem(key);
  }

  public clear(){
    localStorage.clear(); 
  }

  public containsKey(keyToLookFor : string) : boolean {
    let keyFound = false;

    for (let ii = 0; ii < localStorage.length; ii++) {
      let stepKey = localStorage.key(ii);
      
      if (stepKey === keyToLookFor) {
        keyFound = true;
        break;
      }
    }

    return keyFound;
  }
}
