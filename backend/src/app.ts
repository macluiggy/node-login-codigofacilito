import express from "express";
import indexRoute from "./routes/index.route";
import cors from "cors";
import path from "path";
const app = express();

import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-local";
// const PassportLocal = require("passport-local").Strategy;
import { start } from "repl";

// set engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(express.json());
app.use(cors()); //nunca te olvides de poner esto, si es que vas a usar las api de otro lado, osea de otro dominio o proxy
app.use(express.urlencoded({ extended: true })); // this is for post requests
app.use(cookieParser("secreto-secretito")); // this is for managing sessions
app.use(
  session({
    secret: "secreto-secretito",
    resave: true, // save session even if not modified
    saveUninitialized: true, // this is for saving session even if we don't have any data saved
  })
);
app.use(passport.initialize()); // middleware for passport
app.use(passport.session()); // passport with session
passport.use(
  new Strategy((username, password, done) => {
    //
    if (username === "admin" && password === "admin") {
      // if the username and password are correct
      return done(null, { id: 1, name: "admin" });
    }
    return done(null, false); // if the user is not found
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(null, { id: 1, name: "admin" });
});
//routes
app.use("/", indexRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
