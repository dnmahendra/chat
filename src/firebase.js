import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDUyOeclb6qT9TrfEWGAGYGOa08AHkw1ec",
  authDomain: "chat-app-59bd9.firebaseapp.com",
  databaseURL: "https://chat-app-59bd9.firebaseio.com",
  projectId: "chat-app-59bd9",
  storageBucket: "chat-app-59bd9.appspot.com",
  messagingSenderId: "876010481616",
  appId: "1:876010481616:web:2a8322f06de49149"
};

firebase.initializeApp(config);

const db = firebase.firestore();

const rtdb = firebase.database()

export function setupPresence (user) {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  }

  const isOnlineforRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  }

  const isOfflineForFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  }

  const isOnlineforFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  }

  const rtdbRef = rtdb.ref(`/status/${user.uid}`)
  const userDoc = db.doc(`/users/${user.uid}`)

  rtdb.ref('.info/connected').on('value', async (snapshot) => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore
      })
      return
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB)

    // online
    rtdbRef.set(isOnlineforRTDB)
    userDoc.update({
      status: isOnlineforFirestore
    })
  })
}
export { db, firebase };
