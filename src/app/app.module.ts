import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChatingComponent } from './chating/chating.component';
// import { AdminFeedBackComponent } from './admin-feed-back/admin-feed-back.component';
// import { AdminFeedBackComponent } from './admin-feed-back/admin-feed-back.component';


// Must export the config for firebase
export const firebaseConfig = {
    apiKey: "AIzaSyCuEUXEjn9pLPp08Vude3qmyDS5gYiO2zE",
    authDomain: "chatappangular2-c6a39.firebaseapp.com",
    databaseURL: "https://chatappangular2-c6a39.firebaseio.com",
    storageBucket: "chatappangular2-c6a39.appspot.com",
    messagingSenderId: "9799719803"
};

// for routing
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register/account', component: RegistrationComponent },
    { path: 'home', component: HomeComponent },
    { path: 'chat', component: ChatingComponent },
    // { path: 'admin/feedback', component: AdminFeedBackComponent },
    { path: '**', component: LoginComponent } // for redirect
];


@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        LoginComponent,
        HomeComponent,
        ChatingComponent
        // AdminFeedBackComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        AngularFireModule.initializeApp(firebaseConfig),
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private router: Router) {
    }
}
