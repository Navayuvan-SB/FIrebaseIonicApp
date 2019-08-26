import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'

import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseServices {
   
   // integer values for three sorting types
   public orderByChild  : number = 1;
   public orderByKey    : number = 2;
   public orderByValue  : number = 3;

   // integer values for five filtering methods
   public limitToFirst  : number = 1;
   public limitToLast   : number = 2;
   public startAt       : number = 3;
   public endAt         : number = 4;
   public equalTo       : number = 5;


   constructor(public fbAuth        : AngularFireAuth,
               public fbDatabase    : AngularFireDatabase){}

   // get the nodes under the parent as json object
   readOnce(parent: string){

      console.log("readOnce function called");
      this.fbDatabase.database.ref(parent)
      .once("value")
      .then(function(snapshot) {
         return snapshot;
      })
      .catch(function(error){
         console.log("Something is wrong");
      });
   }

   // write data to database
   writeInDatabase(parent: string, data: any){
      this.fbDatabase.database.ref(parent)
      .set(data)
      .then(function (message){
         return "Data written successfully";
      })
      .catch(function(error) {
         return "Data written failed";
      });
   }

   // update a field or append a child to the parent

   updateField(data: any){

      this.fbDatabase.database.ref()
      .update(data)
      .then(function(){
         console.log("Field updated successfully");
      })
      .catch(function(error){
         console.log("Field updation failed");
      });
   }

   // remove a field
   removeField(parent: string, child: string){

      this.fbDatabase.database.ref(parent).child(child)
      .remove()
      .then(function(){
         console.log("Field removed successfully");
      })
      .catch(function(){
         console.log("Field removal failed");
      });
   }

   // filter the data 
   filterData(method: number,parent: string, limit: number){

      return new Promise(function (resolve, reject) {
         switch(method){
            case this.limitToFirst:
               this.fbDatabase.database.ref(parent)
                  .limitToFirst(limit)
                  .once("value")
                  .then(function(snapshot){
                     resolve(snapshot.val());
                  })
                  .catch(function(error){
                     reject(error);
                  });
               break;
   
            case this.limitToLast:
               this.fbDatabase.database.ref(parent)
                  .limitToLast(limit)
                  .once("value")
                  .then(function(snapshot){
                     resolve(snapshot.val());
                  })
                  .catch(function(error){
                     reject(error);
                  });
               break;
            
            case this.startAt:
               this.fbDatabase.database.ref(parent)
                  .startAt(limit)
                  .once("value")
                  .then(function(snapshot){
                     resolve(snapshot.val());
                  })
                  .catch(function(error){
                     reject(error);
                  });
               break;
   
            case this.endAt:
               this.fbDatabase.database.ref(parent)
                  .endAt(limit)
                  .once("value")
                  .then(function(snapshot){
                     resolve(snapshot.val());
                  })
                  .catch(function(error){
                     reject(error);
                  });
               break;
   
            case this.equalTo:
               this.fbDatabase.database.ref(parent)
                  .equalTo(limit)
                  .once("value")
                  .then(function(snapshot){
                     resolve(snapshot.val());
                  })
                  .catch(function(error){
                     reject(error);
                  });
               break;
   
            default:
               reject("error");;
         }
      });

   }
   



}
