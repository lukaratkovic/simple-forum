import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatabaseService} from "../shared/database.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newUser = {username: '', password: '', repeatPassword: '', name: '', mail: ''};
  registerForm : FormGroup;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private databaseService : DatabaseService){
    this.registerForm = this.fb.group({
      'username': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'password': new FormControl('', Validators.required),
      'repeatPassword': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'mail': new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    if(this.registerForm.value.password != this.registerForm.value.repeatPassword){
      alert("Passwords do not match!");
      return;
    }
    delete this.registerForm.value.repeatPassword;
    this.databaseService.addUser(this.registerForm.value)
       .subscribe(()=>this.router.navigate(['/login']));
  }
}
