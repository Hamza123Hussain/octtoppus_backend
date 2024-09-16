// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD2tgbuK1fXyIhG46MzJ5OkOocYCJVUzNA',
  authDomain: 'auctionapex-ac750.firebaseapp.com',
  projectId: 'auctionapex-ac750',
  storageBucket: 'auctionapex-ac750.appspot.com',
  messagingSenderId: '480505344522',
  appId: '1:480505344522:web:b856dabb06c97f67d5a5f3',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const Auth = getAuth(app)
export const Storage = getStorage(app)
