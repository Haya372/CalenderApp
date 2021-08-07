var express = require('express');
var router = express.Router();
const { db } = require('../../firebase/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('test').add({
    type: "test",
    timestamp: Date.now()
  })
  res.send('OK');
});

module.exports = router;
