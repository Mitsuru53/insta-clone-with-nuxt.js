import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyBAHazqLe44bJRe2DWXAKgD1EOQJz4I2e0",
      authDomain: "insta-clone-bbe24.firebaseapp.com",
      databaseURL: 'https://insta-clone-bbe24.firebaseio.com',
      projectId: "insta-clone-bbe24",
      storageBucket: "gs://insta-clone-bbe24.appspot.com",
      // storageBucket: "insta-clone-bbe24.appspot.com",
      messagingSenderId: "989920782530"
    }
  )
}

export default firebase
