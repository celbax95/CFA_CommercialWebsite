"use strict";
const auth = require("../service/AuthService");

exports.login = async function (req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    let user = auth.getUser(req.body.email);

    if (user == null) {
      // TODO email pas enregistré
      //return res.sendStatus(401);
    }

    if (req.body.password === auth.getEncryptedPassword(user.password)) {
      let accessToken = auth.generateToken(user);
      return res.send(
        JSON.stringify({
          status: 200,
          error: null,
          response: { token: accessToken, user: user },
        })
      );
    } else {
      return res.sendStatus(401);
    }
  } catch (e) {
    console.log(e);
    res.send(
      JSON.stringify({ status: 502, error: "Internal Error", response: [] })
    );
  }
};
