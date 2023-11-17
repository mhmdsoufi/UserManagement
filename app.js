import dotenv from 'dotenv';

import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import connectDB from './server/config/db.js';
import customerRouter from './server/routes/customer.js';
import session from 'express-session';
import flash from 'express-flash-message';
import methodOverride from 'method-override';

dotenv.config();

const app = express();
const port = 5000 || process.env.PORT;

// Connect to Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// methodOverride
app.use(methodOverride('_method'));

// Static Files
app.use(express.static('public'));

// Express Session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

// Template Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', customerRouter);

app.all('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`app Running on port ${port}`);
});
