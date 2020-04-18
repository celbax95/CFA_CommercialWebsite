// mongodb+srv://l-mace:cFx5tE0Ll3Hkpry5@mycluster-uaece.mongodb.net/test?retryWrites=true&w=majority

let express = require("express"),
  app = express(),
  http = require("http").createServer(app),
  io = require("socket.io")(http),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser");

app.use((req, res, next) => {
  res.locals.io = io;
  next();
  return;
});

io.on("connection", function (socket) {
  console.log("new user connect");
});

// mongoose instance connection url connection mongoose.
Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://l-mace:cFx5tE0Ll3Hkpry5@mycluster-uaece.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// cors = requettes inter serveur entre deux host (3000 / 3001)
app.use(cors());

const auth = require("./Server/API/service/AuthService"); //importing route
app.use(auth.service); //register the route

let auth_routes = require("./Server/API/route/AuthRoutes"); //importing route
auth_routes(app); //register the route

http.listen(port);
console.log("API is listening on port: " + port);
