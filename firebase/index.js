const admin = require('firebase-admin');

var serviceAccount = require("../calenderapp-firebase-adminKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = {
  db: admin.firestore(),
  fieldValue: admin.firestore.fieldValue,
  admin: admin
};