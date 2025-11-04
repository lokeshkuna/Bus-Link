import jwt from "jsonwebtoken";
import { moderatorModel } from "../server/models/moderatorModel.js";

const requireAuthMod = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token); 

    if (token) {
      const secret = process.env.MOD_JWT_SECRET || "mod_jwt_secret_placeholder";
      jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
          console.log(error.message);
          res.redirect("/mod");
        } else {
          console.log("Decoded token : ");
          console.log(decodedToken);
          console.log("session : ");
          console.log(req.session); 
          next();
        }
      });
    } else {
      res.redirect("/mod");
    }
  } catch (error) {
    console.log(error.message);
    console.log("moderator is not logged in.");
    res.redirect("/mod");
  }
};

export { requireAuthMod };
