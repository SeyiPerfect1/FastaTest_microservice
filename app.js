const express =  require('express');
const logger = require('morgan');
const path = require('path');
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

const helmet = require('helmet');


const app = express();

// //  use passport middleware
// require('./src/middlewares/auth');

// security middleware
app.use(helmet());

//  use logger middleware
app.use(logger('dev'));

//  middleware to serve public files
app.use(express.static(path.join(__dirname, './src/public')));

//  use body parsr middleware
app.use(express.json);
app.use(express.urlencoded({ extended: false }));

//  set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// //  add routes
// app.use('/accounts', authRouter);
// app.use('/posts', postRouter);
// app.use('/posts', commentRouter);
// app.use('/', userRouter);

//  homepage route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome home'
  });
});

//  unavailable resources route
app.get('*', (req, res, next) => {
  try {
    res.status(404).json({
      message: 'No page found, check url!!!'
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        error: err.message
    })
});

module.exports = app;