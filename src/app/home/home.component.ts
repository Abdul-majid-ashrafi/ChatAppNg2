import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    getKey: any;
    fb: any
    users: any;
    current: any;
    constructor(private af: AngularFire, public router: Router) {
        this.getKey = localStorage.getItem("key")
        this.fb = this.af.database.list('/users')
        // this.getKey = localStorage.getItem("key")
        // this.items = af.database.object(`/users/${this.getKey}`);
        // this.items.subscribe(item => {
        //     this.obj = {
        //         name: item.FirstName + " " + item.LastName,
        //         mail: item.Email,
        //         type: item.Type
        //     }
        //     // console.log(this.obj.type)
        // })
    }

    ngOnInit() {
        // let feedBacks = this.af.database.list('/feedBacks')
        this.fb.subscribe(item => {
            this.users = item
            console.log(item)
            for (let i = 0; i < item.length; i++) {
                if (item[i].$key === this.getKey) {
                    this.current = item[i].FirstName + " " + item[i].LastName
                    // console.log(this.current)
                }
            }
        })
    }


    logOut() {
        this.af.auth.logout();
        localStorage.removeItem("key")
        this.router.navigate(['/login']);
    }


    go(a, b) {
        console.log("a", a.$key)
        console.log('b', b)
        this.router.navigate(['/chat', { key: a.$key, index: b }]);
    }
}