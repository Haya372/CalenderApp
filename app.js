var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');

const loginRouter  = require('./routes/api/login');
const schedulesRouter = require('./routes/api/schedules');
const userRouter = require('./routes/api/user');

var app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly: true,
    secure: false,
    maxage: 1000 * 60 * 60
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/login', loginRouter);

app.use((req, res, next) => {
  if(!req.session.user_id){
    // GETメソッドは許可してしまって今のところ何も問題ないはず
    res.status(403).send('Forbitton');
    return;
  }
  console.log(req.session.user_id);
  next();
});

app.use('/api/schedules', schedulesRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
});

module.exports = app;
