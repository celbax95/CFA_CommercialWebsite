"use strict";
const auth = require("../../service/AuthService");

exports.login = async function (req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    auth.getUserFromEmail(req.body.email, function (err, user) {
      if (err || user == null) {
        return res.send(
          JSON.stringify({
            status: 401,
            error: "Unknown mail",
            response: {},
          })
        );
      } else {
        // Utilisateur trouve

        // Pour utilisation locale
        //req.body.password = auth.getEncryptedPassword(req.body.password);

        // Stockage du mot de passe deja crypté
        let encryptedPassword = user.password;

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
      }
    });
  } catch (e) {
    console.log(e);
    return res.send(
      JSON.stringify({ status: 502, error: "Internal Error", response: [] })
    );
  }
};
