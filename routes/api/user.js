var express = require('express');
var router = express.Router();
const { db } = require('../../firebase/index');

router.patch('/', (req, res) => {
  const user_id = req.session.user_id;
  const data = req.body.data;
  if(!data.name){
    res.status(400).send('Bad request');
    return;
  }
  db.collection('users').doc(user_id).update({
    name: data.name,
    notify: data.notify || false
  }).then(() => {
    res.status(200).send({
      success: true
    });
  }).catch(err => {
    console.log('update err');
    console.log(err);
    res.status(500).send('server error');
  });
});

module.exports = router;