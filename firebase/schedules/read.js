const { db } = require('../index');

const dateFormat = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if(month < 10) month = '0' + month;
  let day = date.getDate();
  if(day < 10) day = '0' + day;
  return year + '-' + month + '-' + day;
}


function read(user_id, year, month, cb){
  const docRef = db.collection('datas').doc(user_id).collection('schedules');
  const start = new Date(year, Number(month) - 1, 22);
  const end = new Date(year, Number(month) + 1, 7);
  docRef.where('start_at', '>=', start.getTime()).where('start_at', '<', end.getTime())
  .get().then(snapshot => {
    const schedules = {};
    snapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();
      const start_at = new Date(data.start_at);
      const key = dateFormat(start_at);
      const schedule = {
        id: id,
        ...data
      };
      if(schedules[key]){
        schedules[key].push(schedule)
      }else{
        schedules[key] = [schedule];
      }
    });
    if(typeof cb === 'function') cb(null, schedules);
  }).catch(err => {
    console.log('db error')
    // console.log(err);
    if(typeof cb === 'function') cb(err, schedules);
  })
}

function readOne(user_id, schedule_id, cb){
  const docRef = db.collection('datas').doc(user_id).collection('schedules').doc(schedule_id);
  docRef.get().then(doc => {
    if(!doc.exists){
      if(typeof cb === 'function') cb();
      return;
    }
    const data = doc.data();
    if(typeof cb === 'function') cb({
      id: doc.id,
      ...data
    });
  })
}

module.exports = {
  read, readOne
}