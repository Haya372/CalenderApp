const { db } = require('../index');

function exists(line_id, cb) {
  const docRef = db.collection('users');
  docRef.where('line_id', '==', line_id).get().then((snapshot) => {
    if(snapshot.empty){
      if(typeof cb === 'function') cb();
    }else{
      const data = snapshot.docs[0].data();
      if(typeof cb === 'function') cb({
        user_id: snapshot.docs[0].id,
        name: data.name,
        pictureUrl: data.pictureUrl,
      });
    }
  }).catch(e => console.log(e));
}

module.exports = {
  exists,
};