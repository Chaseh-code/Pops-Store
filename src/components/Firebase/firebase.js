import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAguqmsLyUm-JvChPpyF-RJjIml7jMqxak",
    authDomain: "pops-b635c.firebaseapp.com",
    databaseURL: "https://pops-b635c.firebaseio.com",
    projectId: "pops-b635c",
    storageBucket: "pops-b635c.appspot.com",
    messagingSenderId: "531485091521",
    appId: "1:531485091521:web:234524738e11984f7d9640",
    measurementId: "G-NYEZ9676NZ"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    /*** Auth API ***/

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut(); 

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);


    /*** Merge Auth and DB User API ***/

    onAuthUserListener = (next, fallback) => 
    this.auth.onAuthStateChanged(authUser => {
        if(authUser) {
            this.user(authUser.uid)
                .once('value')
                .then(snapshot => {
                    const dbUser = snapshot.val();

                    //default empty roles
                    if(!dbUser.roles) {
                        dbUser.roles = {};
                    }

                    //merge auth and db user
                    authUser = {
                        uid: authUser.uid,
                        email: authUser.email,
                        ...dbUser,
                    };

                    next(authUser);
                });
        } else {
            fallback();
        }
    });

    /*** Inventory pulling ***/

    /*loadInventory = () => {//manually putting the item's uniqueid in at the moment. Will need a way to generate one later for when adding items to the database.
    let inventory = this.db.ref('/inventory/uniqueid/') // This part is telling firebase where to look inside my realtime database. Access like a file path, recieve the data as json
        .once('value') // This lets firebase know that I only want to grab this data once with my listener that it creates
        .then((snapshot) => {
            console.log(inventory);
            //return snapshot.val();
        });
    console.log(inventory);
    }*/

    loadinventory = () => this.db.ref('inventory');

    /*** User API ***/

    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
}

export default Firebase;