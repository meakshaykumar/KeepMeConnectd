import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'groupdesc',
    templateUrl: './groupdesc.html',
    styleUrls: ['./groupdesc.css']

  })
  export class GroupDescComponent implements OnInit{
  events: any;
  allMembers: any;
  currentUser: any;
  inGroup:boolean = false;
  registeredEvent:boolean = false;
  userEvents:any;
  userName: any;
  userGroups:any;
  userGroupId:any;

    constructor(@Inject(MAT_DIALOG_DATA) public data2, public dialog: MatDialogRef<GroupDescComponent>,
      private userService:UserService) {
        
    }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUser(this.currentUser.email).subscribe(res=> this.userName = res);
    this.getUserGroups();
    this.getEvents();
    this.getUserEvents();
    this.groupMembers();
    
  }

  private getUserGroups(){
    this.userService.getUserGroups(this.currentUser.email).subscribe((res)=>{
      this.userGroups = res;
      this.userGroups.filter((e) =>{
        if(e.groupId === this.data2.groupId){
          this.inGroup = true;
        }
      })
     })
  }

  private getUserEvents(){
    this.userService.getUserEvents(this.currentUser.email).subscribe( res =>{
      this.userEvents = res;
      if(Object.keys(this.userEvents).length === 0){
        this.registeredEvent = false;
      }
      else{
        this.userEvents.filter(e=>{
          if(e.eventId === this.events[0].eventId ){
            this.registeredEvent = true;
          }
        })
      }
    })
  }
  private getEvents() {
    this.userService.getGroupEvents(this.data2.groupId).subscribe((res) => {
      this.events = res;
    });
  }

  private groupMembers() {
    this.userService.getGroupMembers(this.data2.groupId).subscribe((res) => {
      this.allMembers = res;
      console.log(res);
    });
  }

  joinGroup(){
    if(this.inGroup === false){
      let params = {
        "userId":this.userName.userId,
        "groupId":this.data2.groupId
      }
      this.userService.joinGroup(params).subscribe(res =>{
        console.log(res);
        this.groupMembers();
        this.getUserGroups();
      })
    }
    else{
      console.log("nothing happened")
    }
  }

    joinEvent(event:any){
      if(this.registeredEvent === false){
        let params = {
          "userId":this.userName.userId,
          "eventId":event.eventId
        }
        this.userService.participateInEvent(params).subscribe(res => {
          console.log(res);
          this.getUserEvents();
        })
      }
      else{
        console.log("nothing happened")
      }
    }
  }