import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { GroupDescComponent } from '../shared/groupDescPopOver/groupdesc.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  currentUser: any;
  userGroups: Object;

  constructor(private userService:UserService, private _modalService:MatDialog) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.userService.getUserGroups(this.currentUser.email).subscribe((res)=>{
     this.userGroups = res;
     console.log(res)
    })
  }

  openInfo(data){
    this._modalService.open(GroupDescComponent, {
      width: '1200px',
      height: '550px',
      data: data
    });
  }

}
