import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';

@Component({
    selector: 'app-chating',
    templateUrl: './chating.component.html',
    styleUrls: ['./chating.component.css']
})
export class ChatingComponent implements OnInit {
    paramsType: any;
    getKey: any;
    fb: any;
    chats: any = [];
    storage: any;
    chat2: any = []
    constructor(private ActivatedRoute: ActivatedRoute, private af: AngularFire) {
        this.getKey = localStorage.getItem("key")
        this.fb = this.af.database.list('/chating')
        this.storage = firebase.storage().ref()
    }

    ngOnInit() {
        this.ActivatedRoute.params.subscribe((data: any) => {
            this.paramsType = data
            // console.log(this.paramsType)
            // let slots = this.af.database.list('/park/' + this.paramsType.type)
            // slots.subscribe(item => {
            // this.slots = item
            // })
        });

        this.fb.subscribe(item => {
            this.chats = []
            for (let i = 0; i < item.length; i++) {
                if (item[i].from === this.getKey) {
                    // console.log(item[i])
                    this.chats.push(item[i])
                } else if (item[i].for === this.getKey) {
                    this.chat2.push(item[i])
                }
            }
        })
        console.log(this.chats)
    }




    upload() {
        console.log("test");
        for (let selectedFile of [(<HTMLInputElement>document.getElementById('userUploadedFile')).files[0]]) {
            if (selectedFile) {
                var thisRef = this.storage.child(selectedFile.name);
                thisRef.put(selectedFile).then((snapshot) => {
                    console.log("image uplad ", snapshot.downloadURL);
                    thisRef.getDownloadURL().then(url => {
                        console.log("image url after = " + url);
                        let obj = {
                            from: this.getKey,
                            img: url,
                            for: this.paramsType.key
                        }
                        this.fb.push(obj)
                    })
                }, (err) => {
                    console.log("Error", err);
                });
            }
        }
    }







    send(msg) {
        let obj = {
            from: this.getKey,
            chat: msg,
            for: this.paramsType.key
        }
        this.fb.push(obj)
        // firebase.storage().ref().child('http://www.mountainguides.com/photos/everest-south/c2_2011b.jpg')
        // firebase.storage();
        // console.log(obj)
    }

}
