import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    myForm: FormGroup;
    constructor(public af: AngularFire, public router: Router, private fb: FormBuilder) {
        this.myForm = fb.group({
            'Email': [''],
            'Password': ['']
        });
    }

    ngOnInit() {
    }

    login(value: any): void {
        this.af.auth.login({
            email: value.Email,
            password: value.Password
        },
            {
                provider: AuthProviders.Password,
                method: AuthMethods.Password
            })
            .catch((error: any) => {
                console.log(error);
                document.getElementById('err').innerHTML = `
                 <div class="alert alert-success alert-dismissible">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Error!</strong> 
                The password is invalid or the user does not have a password.
                      </div>`
            })
            .then((user: any) => {
                if (user) {
                    // console.log(user)
                    localStorage.setItem("key", user.uid)
                    this.router.navigate(['/home']);
                }
            });
    }
}