require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express();
const PORT = process.env.PORT || 5000;
  
// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.locals.isActiveRoute = isActiveRoute; 


app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, ()=> {
  console.log(`App listening on port ${PORT}`);
});



// emailsender  conttact page//

const MailLogSchema = new mongoose.Schema({
  sender: String,
  subject: String,
  message: String,
  dateSent: { type: Date, default: Date.now },
  infoResponse: String,  
  error: String,         
});

const MailLog = mongoose.model('MailLog', MailLogSchema);

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  res.locals.isActiveRoute = (route, currentRoute) => {
    return route === currentRoute ? 'active' : '';
  };
  next();
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  const sender = req.body.sender;
  const message = req.body.message;

 
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,      
      pass: process.env.EMAIL_PASS       
    },
    debug: true  
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error('Transporter verification failed:', error);
    } else {
      console.log('Server is ready to send emails');
    }
  });

  let mailOptions = {
    from: sender,                   
    to: 'dims90995@gmail.com',         
    subject: 'New Contact Message',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending mail:', error);
      res.render('contact', { message: 'Error sending message. Please try again later.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.render('contact', { message: 'Message sent successfully!' });
    }
        log.save((err) => {
      if (err) {
        console.error('Error saving mail log:', err);
      } else {
        console.log('Mail log saved successfully.');
      }
    });

    new MailLog(logData)
      .save()
      .then(savedLog => {
        console.log('Mail log saved successfully:', savedLog);
      })
      .catch(err => {
        console.error('Error saving mail log:', err);
      });

    if (error) {
      console.error('Error sending mail:', error);
      res.render('contact', { message: 'Error sending message. Please try again later.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.render('contact', { message: 'Message sent successfully!' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI, 
  })
}));

