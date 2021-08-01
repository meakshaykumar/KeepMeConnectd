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

    constructor(@Inject(MAT_DIALOG_DATA) public data2, public dialog: MatDialogRef<GroupDescComponent>,
      private userService:UserService) {
        
    }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getEvents();
    this.groupMembers();
    
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
      this.allMembers.filter((e) => {
        if (e.email === this.currentUser.email) {
          this.inGroup = true;
        }
      });
    });
  }

  joinGroup(){
    let params = {
      "userId":"waiting",
      "groupId":this.data2.groupId
    }
    this.userService.joinGroup(params).subscribe(res =>{

    })
  }
  }