var express = require('express');
var router = express.Router();
const { create } = require('../../firebase/schedules/create');

/* GET home page. */
router.post('/', function(req, res, next) {
  create(req.session.user_id, req.body.data, (err) => {
    if(err){
      res.status(500).send('server error');
      return;
    }
    res.status(200).send('success');
  });
});

module.exports = router;
