import jwt from "jsonwebtoken";
import { adminModel } from "../server/models/adminModel.js";

const requireAuthAdmin = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token); 

    if (token) {
      const secret = process.env.ADMIN_JWT_SECRET || "admin_jwt_secret_placeholder";
      jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
          console.log(error.message);
          res.redirect("/admin");
        } else {
          console.log("Decoded token : ");
          console.log(decodedToken);
          console.log("session : ");
          console.log(req.session); 
          next();
        }
      });
    } else {
      res.redirect("/admin");
    }
  } catch (error) {
    console.log(error.message);
    console.log("admin is not logged in.");
    res.redirect("/admin");
  }
};

const authAdminSession = (req, res, next) => {
  try {
    if (req.sessions.admin_id) {
      next();
    } else {
      console.log("Admin has no session logged in");
      if (req.cookies.jwt) {
        res.cookie("jwt", "", { maxAge: 400 });
        console.log("cookie removed");
      }
      res.redirect("/admin");
    }
    next();
  } catch (error) {}
};

const checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    const secret = process.env.ADMIN_JWT_SECRET || "admin_jwt_secret_placeholder";
    jwt.verify(token, secret, async (error, decodedToken) => {
      if (error) {
        console.log(error);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await adminModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const checkSession = (admin) => (req, res, next) => {
  if (req.session && req.session.admin_id) {
    if (req.session.admin_id === admin._id) {
      next();
    } else {
      res.redirect("/admin");
    }
  } else {
    res.redirect("/admin");
  }
};

export { requireAuthAdmin, authAdminSession, checkSession };
