import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    myForm: FormGroup;
    constructor(public af: AngularFire, public router: Router, private fb: FormBuilder) {
        this.myForm = fb.group({
            'FirstName': [''],
            'LastName': [''],
            'Email': [''],
            'Password': [''],
            'Phone': [''],
            'Age': ['']
        });
    }

    ngOnInit() {
    }
    signUp(value: any): void {
        this.af.auth.createUser({ email: value.Email, password: value.Password })
            .catch((error: any) => {
                console.log(error);
            })
            .then((users: any) => {
                delete value.Password;
                this.af.database.object('/users/' + users.uid).set(value);
                localStorage.setItem("key", users.uid)
                this.router.navigate(['/home']);
            });
    }
}