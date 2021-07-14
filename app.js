/*
|--------------------------------------------------------------------------
| Dependencies Part
|--------------------------------------------------------------------------
*/
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
const environment = process.env.NODE_ENV; // development
const session = require('express-session');
require('./database/mongoDBConnection');
const cors = require('cors');
const flash = require('connect-flash');
const redis = require('redis');
const client = redis.createClient({
    host: '127.0.0.1',
    port: '6379',
    password: ''
});
client.on('error', err => {
    console.log("---------------------");
    console.log('Error ' + err);
    console.log("---------------------");
});
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false,
    //store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
debug("Connected To Database");
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
const winston = require('./config/winston');
if (process.env.NODE_ENV === "development") {
    debug("Morgan Enabled");
    app.use(morgan("combine", {stream: winston.stream}))
}
/*
|--------------------------------------------------------------------------
| Connection to Mysql Part
|--------------------------------------------------------------------------
*/
sequelize
    .sync()
    .then(() => {
        console.log("---------------------");
        console.log('Mysql Connected.');
        console.log("---------------------");
    })
    .catch(err => {
        console.log("---------------------");
        console.error('Unable to connect to the database:', err);
        console.log("---------------------");
    });
/*
|--------------------------------------------------------------------------
| Access Part
|--------------------------------------------------------------------------
*/
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
/*
|--------------------------------------------------------------------------
| Abilities Part
|--------------------------------------------------------------------------
*/
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'resources/views'));
app.set("view engine", "ejs");
if (environment !== 'production') {
    app.use(logger('dev'));
}
/*
|--------------------------------------------------------------------------
| Socket Part
|--------------------------------------------------------------------------
*/
/*
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// Chat Room
app.use('/api/chats', require('./routes/chat/ChatRoutes'));
io.on('connection', (socket) => {
    console.log('a user connected');
});
*/

/*
|--------------------------------------------------------------------------
| Routing Part
|--------------------------------------------------------------------------
*/
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

/*
|--------------------------------------------------------------------------
| Routing Part
|--------------------------------------------------------------------------
*/
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

/*
|--------------------------------------------------------------------------
| Listening App Part
|--------------------------------------------------------------------------
*/
const port = process.env.PORT || 3001;
const redis_port = process.env.PORT || 6379;
app.listen(port, () => {
    console.log("---------------------");
    console.log(`Server started on port ${port}`);
    console.log("---------------------");
});

module.exports = app;

