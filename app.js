const debug = require('debug')('nodejs_project_8');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const sequelize = require('./database/connection');
const app = express();
const path = require('path');
//const dir = path.basename('/Users/Refsnes/demo_path.js');
const environment = process.env.NODE_ENV; // development
//const mongoose = require('mongoose');
//const fs = require('fs');
//const MongoStore = require('connect-mongo');
const cors = require('cors');
const flash = require('connect-flash');
const session = require('express-session');
const redis = require('redis');
const client = redis.createClient({
    host: '127.0.0.1',
    port: '6379',
    password: ''
});

client.on('error', err => {
    console.log('Error ' + err);
});

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    //store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(bodyParser.text({type: '*/*'}));

debug("Connected To Database");
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

/*const whitelist = ['http://localgost:8000', 'http://localgost:8000'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;
    let isExtensionAllowed = req.path.endsWith('.jpg');

    if (isDomainAllowed && isExtensionAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true }
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
};
app.use(cors(corsOptionsDelegate));*/

const winston = require('./config/winston');
if(process.env.NODE_ENV === "development") {
    debug("Morgan Enabled");
    app.use(morgan("combine", {stream: winston.stream}))
}

sequelize
    .sync()
    .then(() => {
        console.log('Mysql Connected.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'resources/views'));
app.set("view engine", "ejs");

if (environment !== 'production') {
    app.use(logger('dev'));
}

// Load routes
app.use('/api/', require('./routes/front/homeRoutes'));
app.use('/api/about', require('./routes/front/homeRoutes'));
app.use("/api/errors", require('./routes/errors/errorRoutes'));
app.use('/api', require('./routes/auth/authRoutes'));
app.use('/api/panel/dashboard', require('./routes/panel/dashboardRoutes'));
app.use('/api/panel/employees', require('./routes/panel/employeeRoutes'));
app.use('/api/panel/users', require('./routes/panel/userRoutes'));
app.use('/api/panel/brands', require('./routes/panel/brandRoutes'));
app.use('/api/panel/product-categories', require('./routes/panel/productCategoryRoutes'));
app.use('/api/panel/products', require('./routes/panel/productRoutes'));
app.use('/api/panel/article-categories', require('./routes/panel/articleCategoryRoutes'));
app.use('/api/panel/articles', require('./routes/panel/articleRoutes'));
app.use('/api/panel/banks', require('./routes/panel/bankRoutes'));
app.use('/api/panel/roles', require('./routes/panel/roleRoutes'));
// profile account
app.use('/api/profile/my-profile', require('./routes/profile/MyProfileRoutes'));
app.use('/api/profile/my-cart', require('./routes/profile/MyCartsRoutes'));
app.use('/api/profile/my-transactions', require('./routes/profile/MyTransactionsRoutes'));

const port = process.env.PORT || 3001;
const redis_port = process.env.PORT || 6379;

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});

module.exports = app;

