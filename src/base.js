import Rebase from "re-base"
import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyDy6F6dDdmYHXKwSMpP5jLOFwDQcl5i7Ng",
    authDomain: "inventory-management-af7c1.firebaseapp.com",
    databaseURL: "https://inventory-management-af7c1.firebaseio.com",
  };

const firebaseApp= firebase.initializeApp(firebaseConfig);
const base = Rebase.createClass(firebaseApp.database());

// THis is a named export
export {firebaseApp};

// THis is a default export
export default base;