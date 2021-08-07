const { db } = require('../index');

function exists(user_data, cb) {
  const docRef = db.collection('users');
  docRef.where('line_id', '==', user_data.userId).get().then((snapshot) => {
    if(snapshot.empty){
      docRef.add({
        line_id: user_data.userId,
        name: user_data.displayName,
        pictureUrl: user_data.pictureUrl
      }).then(newDoc => {
        if(typeof cb === 'function') cb({
          user_id: newDoc.id,
          name: user_data.displayName,
          pictureUrl: user_data.pictureUrl,
          createAccount: true
        });
        console.log('create user: ', newDoc.id);
      })
    }else{
      const data = snapshot.docs[0].data();
      if(typeof cb === 'function') cb({
        user_id: snapshot.docs[0].id,
        name: data.name,
        pictureUrl: data.pictureUrl,
        createAccount: false
      });
    }
  })
}

module.exports = {
  exists,
};