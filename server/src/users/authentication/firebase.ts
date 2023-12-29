// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import * as admin from 'firebase-admin'
// import serviceAccount from '../authentication/admin-firebase.json'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAvpGQE1zpPY_6xNOxxqGHYAV2ghDuoB_0',
  authDomain: 'linkit-project.firebaseapp.com',
  projectId: 'linkit-project',
  storageBucket: 'linkit-project.appspot.com',
  messagingSenderId: '25480455134',
  appId: '1:25480455134:web:dec86d6fbe5aef35e9334f',
  measurementId: 'G-M6F6EHLMX7'
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../../admin-firebase.json')
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth, admin }
