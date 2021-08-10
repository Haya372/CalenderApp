const { db } = require('../index');

function create(user_id, data, cb){
  const docRef = db.collection('datas').doc(user_id).collection('schedules');
  const batch = db.batch();
  new Promise((resolve, reject) => {
    try {
      data.dates.forEach((date) => {
        const newSchedule = {
          title: data.title,
          start_at: date,
          tag: data.tag,
          memo: data.memo
        };
        batch.set(docRef.doc(), newSchedule);
      });
    }catch(err){
      console.log(err)
      reject(err);
    }
    resolve();
  }).then(() => {
    batch.commit();
    if(typeof cb === 'function') cb();
  }).catch(err => {
    console.log('schedule create error');
    if(typeof cb === 'function') cb(err);
  })
}

module.exports = {
  create
};