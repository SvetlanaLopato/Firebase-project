import { Component } from '@angular/core';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

import 'firebase/firestore';

import { checkAndUpdateBinding } from '@angular/core/src/view/util';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    private data: any;

    constructor() { }

    getData() {
        const database = firebase.database();
    
        database.ref('student')
            .once("value")
            .then(snapshot => {
                this.data = snapshot.child("student1").val(); // "ada"
            })
            .catch(error => {
                console.log(error.message);
            })
    }
}
