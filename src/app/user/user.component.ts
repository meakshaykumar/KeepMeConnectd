import { Component, OnInit } from '@angular/core';
import Typewriter from 't-writer.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  hide = true;

  loginForm: FormGroup;
  displayError: boolean;
  constructor(public fb: FormBuilder, private router :Router, private userService:UserService, private _snackBar: MatSnackBar) {
    this.createLoginForm();
   }

  ngOnInit(): void {
    this.createLoginForm();
    const target = document.querySelector('.my-title')
    const writer = new Typewriter(target, {
      loop: false,
      typeSpeed: 80,
      deleteSpeed: 80,
      typeColor: 'white',
      cursorColor:'white'
    })
    
    writer
      .type('Hi, Welcome to Keep Me Conectted')
      .rest(500)
      .changeOps({ deleteSpeed: 80 })
      .remove(6)
      .type('nected. Explore people with similar interests')
      .rest(500)
      .type(' and take part in various activities.')
      .start()

  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    let crendentials = this.loginForm.value;
    let params = {
      "email":crendentials.email,
      "password":crendentials.password
    }
    this.userService.authenticateUser(params).subscribe((res:any)=>{
      if(res === "Success"){
        this.loginForm.reset();
        this.router.navigate(['/home'])
        this.displayError = false
      }
      else{
        this.displayError = true
      }
    })
  }
}
