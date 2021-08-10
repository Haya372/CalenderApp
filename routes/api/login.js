var express = require('express');
var router = express.Router();
const axios = require('axios');
const { exists } = require('../../firebase/users/exists');

/* GET home page. */
router.post('/', function(req, res, next) {
  const token = req.body.access_token;
  if(!token){
    res.status(400).send("id token is required");
    return;
  }
  if(req.session.user_id){
    console.log('You have already logged in');
    res.status(200).send('You have already logged in');
    return;
  }
  if(req.body.user_id){
    // ここの処理は後で削除する
    req.session.user_id = req.body.user_id;
    res.status(200).send({ user_id: req.body.user_id });
    return;
  }
  axios.get('https://api.line.me/oauth2/v2.1/verify', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      access_token: token,
    }
}).then(response => {
    const verify = response.data;
    // verify access token
    if(verify.client_id !== process.env.LIFF_CHANNEL_ID){
      console.log('forbitten')
      res.status(403).send('not permitted');
      return;
    }
    if(verify.expires_in <= 0){
      console.log('access token expired');
      res.status(403).send('token expired');
      return;
    }
    axios.get('https://api.line.me/v2/profile', {
      headers: {
        'Authorization': "Bearer " + token,
      }
    }).then(data => {
      const user_data = data.data;
      exists(user_data, (data) => {
        req.session.user_id = data.user_id;
        res.status(200).send(data);
      });
    }).catch((err) => {
      console.log(err);
      res.status(500).send('server error');
    });
  }).catch((err) => {
    console.log(err)
    console.log('failed to varify access token');
    res.status(500).send("server error");
  });
});

module.exports = router;
