import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'

import { FirebaseServices } from '../services/fireBaseService'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  credentialForm: FormGroup;

  constructor(public navCtrl      : NavController,
              public navParams    : NavParams,
              public formBuilder  : FormBuilder,
              public fbAuth       : AngularFireAuth,
              public fbDatabase   : AngularFireDatabase,
              public fbService    : FirebaseServices) {

              this.credentialForm = this.formBuilder.group({
                email     : ['',
                               Validators.compose([
                                  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), 
                                  Validators.required
                                ])],
                password  : ['',
                               Validators.compose([
                                  Validators.required,
                                  Validators.minLength(6)
                              ])]
              });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // function for Login
  onSignIn(){

    this.fbAuth.auth.signInWithEmailAndPassword(this.credentialForm.value['email'], this.credentialForm.value['password'])
    .then(data => {
      console.log("SignIn Successfull");
    })
    .catch(error => {
      console.log("Something is wrong");
    });
    
  }

  // functon for forget password
  onForgetPassword(){

    // var starCountRef = this.fbDatabase.database.ref('civil/');
    // starCountRef.on('value', function(snapshot) {
    //   snapshot.forEach(function(childSnapshot){
    //     console.log(childSnapshot.val());
    //   });
    // });
    // this.fbDatabase.database.ref('users/' + '001').set({
    //   username: "navayuvan",
    //   email: "ns.navayuvan@gmail.com",
    //   profile_picture : "imageUrl"
    // });

    // this.fbService.readOnce('users/001');

    // let data = {
    //   "Data" : {
    //     "zero"    : {
    //       "name"    : "Navayuvan",
    //       "number"  : 0
    //     },
    //     "four"    : {
    //       "name"    : "Poorvasha",
    //       "number"  : 4
    //     },
    //     "two"     : {
    //       "name"    : "Ramya",
    //       "number"  : 2
    //     },
    //     "one"     : {
    //       "name"    : "Logida",
    //       "number"  : 1
    //     }
    //   }
    // }
    // this.fbService.writeInDatabase('users/', data);

    // this.fbDatabase.database.ref('users').push({
    //   "name"    : "Navayuvan",
    //   "number"  : 0
    // });
    // this.fbDatabase.database.ref('users').push({
    //   "name"    : "Poorvasha",
    //   "number"  : 4
    // });
    // this.fbDatabase.database.ref('users').push({
    //   "name"    : "Ramya",
    //   "number"  : 2
    // });
    // this.fbDatabase.database.ref('users').push({
    //   "name"    : "Logida",
    //   "number"  : 1
    // });
    // var updateInfo = {
    //   'users/phone': '994493752'
    // }
    // this.fbService.updateField(updateInfo);

    // this.fbService.removeField('users/', 'name');

    // var appendInfo = {
    //   'name': "Nava"
    // }

    // this.fbService
    //     .filterData(this.fbService.limitToFirst, 'CSE ITPROJECTS/JAVA DOT NET/BIG DATA', 20)
    //     .then(function(snapshot){
    //       console.log(snapshot);
    //     })
    //     .catch(function(error){
    //       console.log(error);
    //     });
              
  }

}
