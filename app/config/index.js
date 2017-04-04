
var firebase = require("firebase").initializeApp({
    apiKey: "AIzaSyBew-jpTAbfAAi-dErmOLUZOHoRKHwEBjk",
    // authDomain: "todo-ea1d9.firebaseapp.com",
    databaseURL: "https://todo-ea1d9.firebaseio.com",
    projectId: "todo-ea1d9",
    // storageBucket: "todo-ea1d9.appspot.com",
    // messagingSenderId: "1014338953996"
    // serviceAccount:"./ToDo-984e65ed9a14.json"
})
var ref = firebase.database().ref();

module.exports=ref;
