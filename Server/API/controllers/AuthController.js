"use strict";
const auth = require("../../service/AuthService");

exports.login = async function (req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    let user = auth.getUser(req.body.email);

    if (user == null) {
      return res.send(
        JSON.stringify({
          status: 401,
          error: "Unknown mail",
          response: {},
        })
      );
    }

    let encryptedPassword = auth.getEncryptedPassword(user.password);

    if (req.body.password === encryptedPassword) {
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
