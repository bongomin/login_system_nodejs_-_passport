var express           = require('express');
var path              = require('path');
var cookieperser      = require('cookie-parser');
var bodyParser        = require('body-parser');
var exphbs            = require('express-handlebars');
var  flash            = require('connect-flash');
var session           = require('express-session');
var passport          = require('passport');
var localStrategy     = require('passport-local').strategy;
var mongo             = require('mongodb');
var mongoose          = require('mongoose');
var { ensureAuthenticated } = require('./helpers/auth');

// loading the Routes
var IndexRouter        = require('./routes/index');
var userRouter         = require('./routes/users');
var databaseRouter = require('./config/database');

// initializing the Application
var app = express();





// map global promisies / get reed of worning
mongoose.Promise = global.Promise;
mongoose.connect(databaseRouter.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


// view Engine Handlebars MiddleWare
app.set('views', path.join(__dirname,'views'));
app.engine('handlebars', exphbs({
   extname: 'handlebars',
   defaultLayout: 'layout',
   layoutsDir: path.join(__dirname, 'views/layouts'),
   partialsDir: [
     //  path to your partials
     path.join(__dirname, 'views/partials'),
     ]
   }));
app.set('view engine', 'handlebars');



// bodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(cookieperser());


///static folder that holds my images css /imgs and js
app.use(express.static(path.join(__dirname,'public')));

// express session middleware
app.use(session({
   secret : 'secretKey',
   saveUninitialized : true,
   resave : true
}));

// passport Initialization
app.use(passport.initialize());
app.use(passport.session());


// connect flash middleware
app.use(flash());

// global varioable middle ware for flash messgs

app.use(function (req, res, next) {
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   res.locals.user = req.user || null;
   next();
 })


// routes
app.use('/',IndexRouter);
app.use('/users',userRouter);


var PORT = process.env.PORT || 3000 ;

app.listen(PORT,(req,res) => {
   console.info(` server is running on PORT ${PORT}.....  `);
});











