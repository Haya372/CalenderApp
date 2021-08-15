var express = require('express');
var router = express.Router();
const { create } = require('../../firebase/schedules/create');
const { read, readOne } = require('../../firebase/schedules/read');

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

router.get('/', function(req, res, next) {
  const user_id = req.session.user_id;
  const year = req.query.year;
  const month = req.query.month;
  console.log(user_id, year, month)
  read(user_id, year, month, (err, result) => {
    if(err){
      res.status(500).send('server error');
      return;
    }
    res.status(200).send({
      schedules: result
    });
  });
});

router.get('/:schedule_id', function(req, res, next){
  const user_id = req.session.user_id;
  const schedule_id = req.params.schedule_id;
  readOne(user_id, schedule_id, (result) => {
    if(!result){
      res.status(404).send('not found');
      return;
    }
    res.status(200).send(result);
  });
});

module.exports = router;
