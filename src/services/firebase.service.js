const Config = require('config');
const Firebase = require('firebase-admin');

function init() {
  Firebase.initializeApp({
    credential: Firebase.credential.cert(Config.get('services.firebase.admin')),
  });
}

async function verifyToken(token) {
  return Firebase.auth().verifyIdToken(token);
}

module.exports = {
  init,
  verifyToken,
};
