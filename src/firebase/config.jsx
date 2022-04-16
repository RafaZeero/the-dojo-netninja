import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDBUE68DkqWDuWvKDho4Lht6tQh5_fCCao',
  authDomain: 'myportifolio-a0799.firebaseapp.com',
  projectId: 'myportifolio-a0799',
  storageBucket: 'myportifolio-a0799.appspot.com',
  messagingSenderId: '324986919864',
  appId: '1:324986919864:web:ec5a4b30f38543a54d8d4d'
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
