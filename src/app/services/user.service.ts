import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';

const requestOptions: Object = {
  responseType: 'text'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;

  baseURL:string = "http://localhost:8080/stayconnectedservice/";

  constructor(private http:HttpClient) { 

    this.currentUserSubject = new BehaviorSubject<any> (JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();  
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  authenticateUser(params){
    return this.http.post<string>(this.baseURL+"authenticate",params,requestOptions).pipe(
      map(response => {
        if(response === 'Success') {
          localStorage.setItem('currentUser', JSON.stringify(params));
          this.currentUserSubject.next(params);
        }
        return response;
      })
    );
  }

  getUser(params){
    return this.http.get(this.baseURL+'userData/'+params);
  }

  logOut(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return "logout success";
  }

  getAllGroups(){
    return this.http.get(this.baseURL+'allgroups');
  }

  getGroupEvents(params){
    return this.http.get(this.baseURL+'groupEvents/'+params);
  }

  getGroupMembers(params){
    return this.http.get(this.baseURL+'groupUsers/'+params);
  }

  joinGroup(params){
    return this.http.post(this.baseURL+'joinGroup',params,requestOptions);
  }

  getUserGroups(params){
    return this.http.get(this.baseURL+'groups/'+params);
  }

  getUserEvents(params){
    return this.http.get(this.baseURL+'userEvents/'+params);
  }

  participateInEvent(params){
    return this.http.post(this.baseURL+"eventRegister",params,requestOptions);
  }
}
