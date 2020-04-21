let express = require("express"),
  app = express(),
  http = require("http").createServer(app), // build http server on top of the express one
  io = require("socket.io")(http),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser");

//add socket to middleware
app.use((req, res, next) => {
  res.locals.io = io;
  next();
  return;
});

io.on("connection", function (socket) {
  console.log("new user connect");
});

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

// Remove mangoose warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Connect database
mongoose.connect(
  "mongodb+srv://admin:tfKc6Q3IO8dnUzky@commercialwebsite-vsniv.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let useAuthentificate = false;

// Authentification
const auth = require("./service/AuthService"); //importing route
if (useAuthentificate) {
  app.use(auth.service); //register the route
}

//Importing routes
let user_routes = require("./API/routes/UserRoutes");
let item_routes = require("./API/routes/ItemRoutes");
let category_routes = require("./API/routes/CategoryRoutes");
let order_routes = require("./API/routes/OrderRoutes");
let auth_routes = require("./API/routes/AuthRoutes");

//Register routes
user_routes(app);
item_routes(app);
category_routes(app);
order_routes(app);
auth_routes(app);

http.listen(port);
console.log("API is listening on port: " + port);
