import firebaseAdmin from 'firebase-admin'

const initFirebaseAdmin = () => {
  if (firebaseAdmin.apps.length === 0) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
      })
    })
  }

  return firebaseAdmin
}

export default initFirebaseAdmin
