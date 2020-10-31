import Rebase from 're-base'
import firebase from "firebase/app"
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDDNW27pT3AHrur1AjD9QDJICIcz93tjvk",
    authDomain: "chatbox-app-30173.firebaseapp.com",
    databaseURL: "https://chatbox-app-30173.firebaseio.com"
})

const base =  Rebase.createClass(firebase.database())

export {firebaseApp}

export default base