var express           = require('express');
var path              = require('path');
var cookieperser      = require('cookie-parser');
var bodyParser        = require('body-parser');
var exphbs            = require('express-handlebars');
var expressValidator  = require('express-validator');
var  flash            = require('connect-flash');
var session           = require('express-session');
var passport          = require('passport');
var localStrategy     = require('passport-local').strategy;
var mongo             = require('mongodb');
var mongoose          = require('mongoose');
mongoose.connect('mongdb://localhost/loginsystem');
var db                = mongoose.connection;

// loading the Routes
var IndexRouter        = require('./routes/index');
var userRouter         = require('./routes/users');

// initializing the Application
var app = express();

// view Engine Handlebars MiddleWare
app.set('views', path.join(__dirname,'views'));
app.engine('handlebars', exphbs({defaultLayoyout :'layout'}));
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


// express Validator Middleware
app.use(expressValidator({
   errorFormatter : (param,msg,value) => {
      var namespace = param.split('.'),
      root          = namespace.shift(),
      formParam     = root;
while(namespace.length){
   formParam += '['+ namespace.shift() + ']';
}
return {
    param :formParam,
    msg   : msg,
    value : value
};
   }
}));

// connect flash middleware
app.use(flash());

// global varioable middle ware for flash messgs

app.use((req,res,next) => {
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   next();
});


// routes
app.use('/',IndexRouter);
ap.use('/users',userRouter);


var PORT = process.env.PORT || 3000 ;

app.listen(PORT,(req,res) => {
   console.info(` server is running on PORT ${PORT}.....  `);
});











