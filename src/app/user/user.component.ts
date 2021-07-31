import { Component, OnInit } from '@angular/core';
import Typewriter from 't-writer.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  hide = true;

  loginForm: FormGroup;
  constructor(public fb: FormBuilder, private router :Router) {
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
    this.loginForm.reset();
    this.router.navigate(['/home'])
  }
}
