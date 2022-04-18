import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAyCE74pPq3phpqdARU-h1-98exJ3tgb-Q',
  authDomain: 'dojo-app-6c985.firebaseapp.com',
  projectId: 'dojo-app-6c985',
  storageBucket: 'dojo-app-6c985.appspot.com',
  messagingSenderId: '21657651228',
  appId: '1:21657651228:web:1ae7cf7179960d5532f7d9'
}

//init firebase
const firebaseApp = initializeApp(firebaseConfig)

//init services
const projectAuth = getAuth(firebaseApp)
const projectFirestore = getFirestore(firebaseApp)
const projectStorage = getStorage(firebaseApp)
const projectDatabase = getDatabase(firebaseApp)
// const projectRef = ref(projectStorage)

//timestamp
const timestamp = serverTimestamp()

export {
  projectAuth,
  projectFirestore,
  projectStorage,
  projectDatabase,
  timestamp
}
