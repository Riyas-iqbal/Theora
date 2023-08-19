const admin = require('firebase-admin');

const serviceAccount = require("../../.firebase/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin
