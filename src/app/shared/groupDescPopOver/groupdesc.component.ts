import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'groupdesc',
    templateUrl: './groupdesc.html',
  })
  export class GroupDescComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data2, public dialog: MatDialogRef<GroupDescComponent>) {
        
    }
  }